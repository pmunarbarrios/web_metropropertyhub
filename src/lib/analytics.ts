export type AnalyticsEvent =
  | "quote_button_clicked"
  | "quote_form_started"
  | "quote_form_submitted"
  | "chat_opened"
  | "chat_message_sent"
  | "phone_clicked"
  | "language_changed";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

/** Pushes an event to the GTM/GA dataLayer if present. No credentials involved. */
export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
}
