"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, RotateCcw, Send } from "lucide-react";
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

export function LiveDemo() {
  return (
    <section id="demo" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="See it in action"
          title="Try the exact flow your customers would experience"
          description="A real, live AI — a generic example, not yet tuned to a specific business. It asks the same kind of qualifying questions a real client's AI receptionist would."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-14 max-w-xl">
          <TextDemo />
        </div>
      </div>
    </section>
  );
}
