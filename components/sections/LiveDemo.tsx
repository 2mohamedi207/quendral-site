"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, Play, RotateCcw, CalendarCheck, Send, Volume2, VolumeX } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const OPENER: ChatMessage = {
  role: "assistant",
  content: "Hey! Sorry we missed your call — this is our AI assistant. What can we help with today?",
};

const SUGGESTIONS = ["Need a quote for a basement reno", "Is anyone available today?", "What are your hours?"];

function TextDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([OPENER]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending || limitReached) return;
    setError(null);
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (res.status === 429) {
        setLimitReached(true);
      } else if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setError("Couldn't reach the demo assistant — try again in a moment.");
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setMessages([OPENER]);
    setLimitReached(false);
    setError(null);
    setInput("");
  }

  return (
    <div className="flex h-full flex-col rounded-3xl border border-border-subtle bg-background-elevated shadow-card-lg">
      <div className="flex items-center justify-between border-b border-border-subtle p-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-tint text-accent">
            <MessageSquare size={16} strokeWidth={2.25} />
          </span>
          <div>
            <p className="text-sm font-bold tracking-[-0.01em]">Text conversation</p>
            <p className="text-xs text-muted">Live AI demo — generic, not tuned to a real business</p>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <RotateCcw size={12} />
          Restart
        </button>
      </div>

      <div ref={scrollRef} className="flex min-h-[280px] flex-1 flex-col gap-3 overflow-y-auto p-5">
        <span className="mx-auto rounded-full bg-accent-tint px-3 py-1 text-center text-xs font-semibold text-accent">
          Missed call — 4:12 PM
        </span>
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={
                m.role === "assistant"
                  ? "max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-background px-4 py-2.5 text-sm leading-relaxed"
                  : "max-w-[85%] self-end rounded-2xl rounded-br-sm bg-accent px-4 py-2.5 text-sm leading-relaxed text-white"
              }
            >
              {m.content}
            </motion.div>
          ))}
        </AnimatePresence>
        {sending && (
          <div className="flex max-w-[85%] items-center gap-1 self-start rounded-2xl rounded-bl-sm bg-background px-4 py-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted [animation-delay:300ms]" />
          </div>
        )}
        {messages.length === 1 && (
          <div className="flex flex-col gap-2 pt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="w-fit self-start rounded-full border border-accent/30 bg-accent-tint px-3.5 py-1.5 text-left text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {error && <p className="text-center text-xs text-red-600">{error}</p>}
        {limitReached && (
          <div className="mx-auto flex flex-col items-center gap-2 rounded-2xl border border-border-subtle bg-background p-4 text-center">
            <p className="text-sm font-semibold">That&rsquo;s the demo limit for this session.</p>
            <p className="text-xs text-muted">Want to see how this gets built for your business?</p>
            <Button href="/book" className="!px-5 !py-2 !text-xs">Book a Free Consultation</Button>
          </div>
        )}
      </div>

      <div className="border-t border-border-subtle p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={limitReached ? "Demo limit reached" : "Type a message..."}
            disabled={sending || limitReached}
            maxLength={400}
            className="w-full rounded-full border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted/60 focus:border-accent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={sending || limitReached || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-dark disabled:opacity-40"
            aria-label="Send"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}

interface CallTurn {
  speaker: "ai" | "caller";
  text: string;
}

const CALL_SCRIPT: CallTurn[] = [
  { speaker: "ai", text: "Thanks for calling Basement Makers, this is your AI assistant — how can I help?" },
  { speaker: "caller", text: "Hey, my basement's been leaking after the rain, can someone take a look?" },
  { speaker: "ai", text: "Sorry to hear that. Is this urgent — active water right now — or something we can look at this week?" },
  { speaker: "caller", text: "Not actively flooding, just some dampness along one wall." },
  { speaker: "ai", text: "Got it, that's something we can assess this week. What's the best day for you?" },
  { speaker: "caller", text: "Wednesday afternoon works." },
  { speaker: "ai", text: "You're down for Wednesday at 2pm. You'll get a confirmation text shortly. Anything else?" },
  { speaker: "caller", text: "Nope, that's it, thanks!" },
  { speaker: "ai", text: "Thanks for calling — talk soon." },
];

function speakWithBrowserVoice(
  text: string,
  speaker: "ai" | "caller",
  voices: SpeechSynthesisVoice[]
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    const preferred =
      speaker === "ai"
        ? voices.find((v) => /male|david|daniel|google uk english male/i.test(v.name)) ?? voices[0]
        : voices.find((v) => /female|zira|samantha|google us english/i.test(v.name)) ?? voices[1] ?? voices[0];
    if (preferred) utter.voice = preferred;
    utter.pitch = speaker === "ai" ? 1 : 1.1;
    utter.rate = 1.02;
    utter.onend = () => resolve();
    utter.onerror = () => resolve();
    window.speechSynthesis.speak(utter);
  });
}

// Tries real, human-sounding audio via ElevenLabs first; if that's not
// configured (or fails), falls back to the browser's built-in synthesized
// voice so the demo still works either way.
async function speakLine(
  text: string,
  speaker: "ai" | "caller",
  voices: SpeechSynthesisVoice[]
): Promise<void> {
  try {
    const res = await fetch("/api/demo-voice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, speaker }),
    });
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      await new Promise<void>((resolve) => {
        const audio = new Audio(url);
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.play().catch(() => resolve());
      });
      URL.revokeObjectURL(url);
      return;
    }
  } catch {
    // fall through to browser voice
  }
  await speakWithBrowserVoice(text, speaker, voices);
}

function CallDemo() {
  const [step, setStep] = useState(-1);
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const cancelledRef = useRef(false);
  const runningRef = useRef(false);
  const isPlaying = step >= 0 && step < CALL_SCRIPT.length;
  const isDone = step >= CALL_SCRIPT.length;

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    function loadVoices() {
      voicesRef.current = window.speechSynthesis.getVoices();
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [step]);

  async function play() {
    if (runningRef.current) return; // guard against double-invocation (e.g. a double-click)
    runningRef.current = true;
    cancelledRef.current = false;
    setStep(0);
    setSeconds(0);
    for (let i = 0; i < CALL_SCRIPT.length; i++) {
      if (cancelledRef.current) break;
      setStep(i);
      const turn = CALL_SCRIPT[i];
      if (!muted) {
        await speakLine(turn.text, turn.speaker, voicesRef.current);
      } else {
        await new Promise((r) => setTimeout(r, 1400));
      }
      if (cancelledRef.current) break;
      await new Promise((r) => setTimeout(r, 250));
    }
    if (!cancelledRef.current) setStep(CALL_SCRIPT.length);
    runningRef.current = false;
  }

  function reset() {
    cancelledRef.current = true;
    runningRef.current = false;
    window.speechSynthesis?.cancel();
    setStep(-1);
    setSeconds(0);
  }

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex h-full flex-col rounded-3xl border border-border-subtle bg-background-elevated shadow-card-lg">
      <div className="flex items-center justify-between border-b border-border-subtle p-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-tint text-accent">
            <Phone size={16} strokeWidth={2.25} />
          </span>
          <div>
            <p className="text-sm font-bold tracking-[-0.01em]">Phone call</p>
            <p className="text-xs text-muted">Example call, synthesized voice</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(isPlaying || isDone) && <span className="font-mono text-xs text-muted">{mins}:{secs}</span>}
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:text-accent"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex min-h-[280px] flex-1 flex-col gap-3 overflow-y-auto p-5">
        {step < 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="max-w-[220px] text-sm text-muted">
              Watch — and hear — an example of how a call to the AI receptionist plays out.
            </p>
            <button
              type="button"
              onClick={play}
              className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent-dark"
            >
              <Play size={14} fill="currentColor" />
              Play example call
            </button>
          </div>
        )}

        <AnimatePresence initial={false}>
          {CALL_SCRIPT.slice(0, Math.max(step + 1, 0)).map((turn, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-0.5"
            >
              <span className="text-[11px] font-bold uppercase tracking-wide text-muted">
                {turn.speaker === "ai" ? "AI Receptionist" : "Caller"}
              </span>
              <p
                className={
                  turn.speaker === "ai"
                    ? "max-w-[90%] rounded-2xl rounded-bl-sm bg-background px-4 py-2.5 text-sm leading-relaxed"
                    : "max-w-[90%] self-end rounded-2xl rounded-br-sm bg-accent px-4 py-2.5 text-sm leading-relaxed text-white"
                }
              >
                {turn.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {isDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto flex items-center gap-1.5 rounded-full bg-accent-tint px-3 py-1 text-xs font-semibold text-accent"
          >
            <CalendarCheck size={12} />
            Booked to calendar — Wednesday 2:00 PM
          </motion.div>
        )}
      </div>

      <div className="border-t border-border-subtle p-4 text-center">
        {isDone ? (
          <button
            type="button"
            onClick={reset}
            className="flex w-full items-center justify-center gap-1.5 rounded-full border border-border-subtle px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <RotateCcw size={12} />
            Replay
          </button>
        ) : (
          <p className="text-xs text-muted">
            {isPlaying ? "Call in progress..." : "Tap play to start"}
          </p>
        )}
      </div>
    </div>
  );
}

export function LiveDemo() {
  return (
    <section id="demo" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="See it in action"
          title="Try the exact flow your customers would experience"
          description="The text demo is a real, live AI — a generic example, not yet tuned to a specific business. The call demo is a scripted example using natural AI voice synthesis."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <TextDemo />
          <CallDemo />
        </div>
      </div>
    </section>
  );
}
