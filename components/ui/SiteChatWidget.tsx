"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const OPENER: ChatMessage = {
  role: "assistant",
  content: "Hey! Ask me anything about Quendral — pricing, what's included, how it works.",
};

const SUGGESTIONS = ["What does this cost?", "What's included in Plus?", "How fast can I get started?"];

export function SiteChatWidget() {
  const [open, setOpen] = useState(false);
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
      const res = await fetch("/api/site-chat", {
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
      setError("Couldn't reach the assistant — try again in a moment.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 sm:bottom-8 sm:left-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 left-0 flex h-[480px] w-[min(360px,calc(100vw-3rem))] flex-col overflow-hidden rounded-3xl border border-border-subtle bg-background-elevated shadow-card-lg"
          >
            <div className="flex items-center justify-between border-b border-border-subtle p-4">
              <div>
                <p className="text-sm font-bold tracking-[-0.01em]">Ask about Quendral</p>
                <p className="text-xs text-muted">AI assistant, not a live person</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:text-accent"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                  <p className="text-sm font-semibold">That&rsquo;s the chat limit for this session.</p>
                  <p className="text-xs text-muted">Want to talk it through instead?</p>
                  <Button href="/book" className="!px-5 !py-2 !text-xs">Book a Free Consultation</Button>
                </div>
              )}
            </div>

            <div className="border-t border-border-subtle p-3">
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
                  placeholder={limitReached ? "Chat limit reached" : "Ask a question..."}
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
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.92 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-card-lg transition-colors hover:bg-accent-dark"
        aria-label={open ? "Close chat" : "Open chat about Quendral"}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X size={20} /> : <MessageCircle size={20} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
