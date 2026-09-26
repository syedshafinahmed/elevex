"use client";

import { useEffect, useRef, useState } from "react";
import { BotMessageSquare, X, Send, ChevronDown } from "lucide-react";
import { sansation } from "@/lib/fonts";
import Button from "./Button";

type Message = {
  role: "user" | "model";
  text: string;
};

const WELCOME: Message = {
  role: "model",
  text: "Hi! I'm **Elev**, your Elevex trade assistant. Ask me anything about commodities, trade routes, certifications, or how to use the platform.",
};

function parseMarkdown(text: string): string {
  let result = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
  // Wrap consecutive <li> blocks in <ul>
  result = result
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/((<li>[^]*?<\/li>\s*)+)/g, (match) => `<ul>${match}</ul>`);
  return result.replace(/\n/g, "<br />");
}

export default function AIChat({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", text: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.filter((m) => m !== WELCOME),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "model", text: data.text ?? "Sorry, I couldn't process that." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Panel */}
      {open && (
        <div
          className={`${sansation.className} fixed bottom-[4.5rem] right-6 z-50 w-[22rem] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl border border-foreground/10 flex flex-col`}
          style={{
            background: "color-mix(in srgb, var(--background) 92%, var(--color-amethyst))",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            maxHeight: "min(480px, calc(100svh - 8rem))",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-foreground/10"
            style={{ background: "var(--color-amethyst)" }}
          >
            <div>
              <p className="text-white text-sm font-semibold leading-none">Elev AI</p>
              <p className="text-white/60 text-[10px] mt-0.5">Elevex Trade Assistant</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/70 hover:text-white transition-colors rounded-lg p-1 hover:bg-white/10 cursor-pointer"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "model" && (
                  <div className="h-6 w-6 rounded-full flex items-center justify-center shrink-0 mr-2 mt-0.5"
                    style={{ background: "var(--color-amethyst)" }}>
                    <BotMessageSquare className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-tr-sm text-sm text-white"
                      : "rounded-tl-sm text-sm"
                  }`}
                  style={
                    msg.role === "user"
                      ? { background: "var(--color-amethyst)" }
                      : { background: "color-mix(in srgb, var(--foreground) 8%, transparent)", color: "var(--foreground)" }
                  }
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }}
                />
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="h-6 w-6 rounded-full flex items-center justify-center shrink-0 mr-2 mt-0.5"
                  style={{ background: "var(--color-amethyst)" }}>
                  <BotMessageSquare className="h-3.5 w-3.5 text-white" />
                </div>
                <div
                  className="rounded-2xl rounded-tl-sm px-3 py-2.5 flex gap-1 items-center"
                  style={{ background: "color-mix(in srgb, var(--foreground) 8%, transparent)" }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full animate-bounce"
                      style={{
                        background: "var(--color-amethyst)",
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-foreground/10 flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about trade, products..."
              rows={1}
              disabled={loading}
              className="flex-1 resize-none rounded-xl px-3 py-2 text-sm outline-none border border-foreground/15 focus:border-primary transition-colors disabled:opacity-50 bg-transparent placeholder:text-foreground/40"
              style={{ maxHeight: "6rem" }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-40 disabled:hover:translate-y-0 disabled:pointer-events-none cursor-pointer"
              style={{ background: "var(--color-amethyst)" }}
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        ariaLabel={open ? "Close AI chat" : "Open AI chat"}
        onClick={() => setOpen((o) => !o)}
        className="h-11 w-11 rounded-2xl bg-primary shadow-lg shadow-primary/25 text-background border border-background backdrop-blur-sm"
      >
        {open ? (
          <X className="h-5 w-5 shrink-0" aria-hidden="true" />
        ) : (
          <BotMessageSquare className="h-5 w-5 shrink-0" aria-hidden="true" />
        )}
      </Button>
    </>
  );
}
