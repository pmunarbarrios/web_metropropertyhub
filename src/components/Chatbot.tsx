import { useRouterState } from "@tanstack/react-router";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { trackEvent } from "@/lib/analytics";
import { onOpenChat } from "@/lib/chat-bus";
import { cn } from "@/lib/utils";
import { N8nError, createSessionId, sendChatMessage } from "@/services/n8n";

type Message = { id: string; role: "user" | "assistant"; text: string };

export function Chatbot() {
  const { lang, t } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const lastSent = useRef<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setSessionId(createSessionId()), []);

  useEffect(
    () =>
      onOpenChat(() => {
        setOpen(true);
        trackEvent("chat_opened", { location: "external" });
      }),
    [],
  );

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, sending]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const push = (role: Message["role"], text: string) =>
    setMessages((prev) => [...prev, { id: `${role}-${prev.length}-${Date.now()}`, role, text }]);

  const send = async (raw: string) => {
    const message = raw.trim();
    if (!message || sending) return;
    lastSent.current = message;
    setInput("");
    setError("");
    push("user", message);
    trackEvent("chat_message_sent", { page: pathname });
    setSending(true);
    try {
      const response = await sendChatMessage({ sessionId, message, language: lang, page: pathname });
      push("assistant", response.reply);
    } catch (err) {
      setError(
        err instanceof N8nError && err.kind === "not-configured"
          ? t("chat.notConfigured")
          : t("err.network"),
      );
    } finally {
      setSending(false);
    }
  };

  const quickActions = [t("chat.qa1"), t("chat.qa2"), t("chat.qa4")];

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) trackEvent("chat_opened", { location: "floating_button" });
        }}
        aria-label={open ? t("chat.close") : t("chat.open")}
        aria-expanded={open}
        className="fixed bottom-20 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5 md:bottom-6 md:right-6"
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        )}
        <span className="hidden sm:inline">{open ? t("chat.close") : t("chat.open")}</span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label={t("chat.title")}
          className="fixed bottom-36 right-3 z-50 flex h-[70vh] max-h-[34rem] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)] md:bottom-24 md:right-6"
        >
          <div className="flex items-center justify-between gap-3 bg-ink px-4 py-3.5 text-ink-foreground">
            <div>
              <p className="text-sm font-semibold">{t("chat.title")}</p>
              <p className="text-xs text-ink-foreground/70">{t("chat.subtitle")}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("chat.close")}
              className="rounded-md p-1 text-ink-foreground/80 hover:bg-ink-foreground/10"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <Bubble role="assistant" text={t("chat.greeting")} />
            {messages.map((message) => (
              <Bubble key={message.id} role={message.role} text={message.text} />
            ))}

            {messages.length === 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => void send(action)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                  >
                    {action}
                  </button>
                ))}
              </div>
            ) : null}

            {sending ? (
              <p className="text-xs italic text-muted-foreground">{t("chat.typing")}</p>
            ) : null}


            {error ? (
              <div role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 p-3">
                <p className="text-xs text-foreground">{error}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => void send(lastSent.current)}
                >
                  {t("err.tryAgain")}
                </Button>
              </div>
            ) : null}
          </div>

          <form
            className="flex items-center gap-2 border-t border-border p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <label htmlFor="chat-input" className="sr-only">
              {t("chat.placeholder")}
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat.placeholder")}
              maxLength={2000}
              className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <Button type="submit" size="icon" variant="quote" aria-label={t("chat.send")} disabled={sending}>
              <Send className="h-4 w-4" aria-hidden="true" />
            </Button>
          </form>
        </div>
      ) : null}
    </>
  );
}

function Bubble({ role, text }: { role: Message["role"]; text: string }) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <p
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground",
        )}
      >
        {text}
      </p>
    </div>
  );
}
