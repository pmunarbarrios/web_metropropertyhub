/** Tiny event bus so any CTA can open the floating chatbot. */
const OPEN_CHAT_EVENT = "site:open-chat";

export function openChat(prompt?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<string | undefined>(OPEN_CHAT_EVENT, { detail: prompt }));
}

export function onOpenChat(handler: (prompt?: string) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<string | undefined>).detail);
  window.addEventListener(OPEN_CHAT_EVENT, listener);
  return () => window.removeEventListener(OPEN_CHAT_EVENT, listener);
}
