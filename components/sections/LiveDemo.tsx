"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, Play, RotateCcw, CalendarCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface TextTurn {
  from: "system" | "ai" | "lead";
  text: string;
  reply?: string;
}

const TEXT_SCRIPT: TextTurn[] = [
  { from: "system", text: "Missed call — 4:12 PM" },
  {
    from: "ai",
    text: "Hey! Sorry we missed you — this is Basement Makers' assistant. What can we help with?",
    reply: "Need a quote for a basement reno",
  },
  {
    from: "ai",
    text: "Got it — roughly how big is the space, and are you thinking a full finish or just specific rooms?",
    reply: "About 900 sq ft, full finish",
  },
  {
    from: "ai",
    text: "Perfect, that's exactly what we do. I can get you a free on-site estimate — does Thursday at 10am work?",
    reply: "Thursday at 10am works",
  },
  {
    from: "ai",
    text: "You're booked for Thursday at 10am. We'll text a reminder the day before. Anything else you want us to know?",
    reply: "Nope, see you then!",
  },
  { from: "system", text: "✓ Booked to calendar — Thursday 10:00 AM" },
];

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

function TextDemo() {
  const [step, setStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visible = TEXT_SCRIPT.slice(0, step + 1);
  const current = TEXT_SCRIPT[step];
  const isDone = step >= TEXT_SCRIPT.length - 1;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [step]);

  // Turns without a reply (like the initial "missed call" notice) have no
  // button to click, so they need to auto-advance instead of stalling.
  useEffect(() => {
    if (isDone) return;
    if (current?.reply) return;
    const t = setTimeout(() => setStep((s) => s + 1), 700);
    return () => clearTimeout(t);
  }, [step, isDone, current]);

  function advance() {
    if (!isDone) setStep((s) => s + 1);
  }

  function reset() {
    setStep(0);
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
            <p className="text-xs text-muted">Example conversation, not live</p>
          </div>
        </div>
        {isDone && (
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <RotateCcw size={12} />
            Replay
          </button>
        )}
      </div>

      <div ref={scrollRef} className="flex min-h-[280px] flex-1 flex-col gap-3 overflow-y-auto p-5">
        <AnimatePresence initial={false}>
          {visible.map((turn, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={
                turn.from === "system"
                  ? "mx-auto rounded-full bg-accent-tint px-3 py-1 text-center text-xs font-semibold text-accent"
                  : turn.from === "ai"
                    ? "max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-background px-4 py-2.5 text-sm leading-relaxed"
                    : "max-w-[85%] self-end rounded-2xl rounded-br-sm bg-accent px-4 py-2.5 text-sm leading-relaxed text-white"
              }
            >
              {turn.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-border-subtle p-4">
        {!isDone && current?.reply ? (
          <button
            type="button"
            onClick={advance}
            className="w-full rounded-full border border-accent/30 bg-accent-tint px-4 py-2.5 text-left text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            {current.reply}
          </button>
        ) : (
          <p className="text-center text-xs text-muted">
            {isDone ? "Conversation complete." : "Tap the suggested reply above to continue."}
          </p>
        )}
      </div>
    </div>
  );
}

function CallDemo() {
  const [step, setStep] = useState(-1);
  const [seconds, setSeconds] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPlaying = step >= 0 && step < CALL_SCRIPT.length;
  const isDone = step >= CALL_SCRIPT.length;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (step < 0) return;
    if (step >= CALL_SCRIPT.length) return;
    const delay = step === 0 ? 400 : 1800;
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [step]);

  function play() {
    setStep(0);
    setSeconds(0);
  }

  function reset() {
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
            <p className="text-xs text-muted">Example call, not live audio</p>
          </div>
        </div>
        {(isPlaying || isDone) && (
          <span className="font-mono text-xs text-muted">{mins}:{secs}</span>
        )}
      </div>

      <div ref={scrollRef} className="flex min-h-[280px] flex-1 flex-col gap-3 overflow-y-auto p-5">
        {step < 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="max-w-[220px] text-sm text-muted">
              Watch an example of how a call to the AI receptionist plays out.
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
          {CALL_SCRIPT.slice(0, Math.max(step, 0)).map((turn, i) => (
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
          description="These are scripted example conversations, not connected to a live AI — a preview of the same flow the real system runs for your customers."
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
