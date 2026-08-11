import { NextRequest, NextResponse } from "next/server";

// Two distinct, natural-sounding voices from ElevenLabs' default voice
// library — Adam (deeper, male-leaning) for the AI receptionist, Rachel
// (female-leaning) for the caller. Swap these for whichever voices you
// prefer once you have a real ElevenLabs account set up.
const VOICE_IDS: Record<"ai" | "caller", string> = {
  ai: "pNInz6obpgDQGcFmaJgB", // Adam
  caller: "21m00Tcm4TlvDq8ikWAM", // Rachel
};

const MAX_TEXT_LENGTH = 400;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "voice_not_configured" }, { status: 503 });
  }

  let body: { text?: string; speaker?: "ai" | "caller" };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { text, speaker } = body;
  if (!text || typeof text !== "string" || text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json({ error: "Invalid text" }, { status: 400 });
  }
  if (speaker !== "ai" && speaker !== "caller") {
    return NextResponse.json({ error: "Invalid speaker" }, { status: 400 });
  }

  const voiceId = VOICE_IDS[speaker];

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_turbo_v2_5",
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("ElevenLabs API error:", res.status, errText);
    return NextResponse.json({ error: "Voice synthesis unavailable" }, { status: 502 });
  }

  const audioBuffer = await res.arrayBuffer();
  return new NextResponse(audioBuffer, {
    headers: { "Content-Type": "audio/mpeg" },
  });
}
