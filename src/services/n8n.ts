/**
 * n8n integration layer. No credentials live here: the browser either calls the
 * app's own server proxy (/api/public/*) or a public webhook URL provided via
 * environment variables.
 */

export type Language = "en" | "es";

export type ChatRequest = {
  sessionId: string;
  message: string;
  language: Language;
  page: string;
  timestamp: string;
  source: "website-chatbot";
};

export type ChatResponse = {
  reply: string;
  sessionId: string;
  language: Language;
  lead?: boolean;
  leadId?: string;
};

export type QuotePayload = {
  source: "website-quote-form";
  language: Language;
  fullName: string;
  phone: string;
  email: string;
  propertyType: string;
  service: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  projectDetails: string;
  preferredContactMethod: string;
  timestamp: string;
};

export class N8nError extends Error {
  constructor(
    message: string,
    readonly kind: "network" | "timeout" | "invalid" | "not-configured" | "server",
  ) {
    super(message);
    this.name = "N8nError";
  }
}

const CHAT_PROXY = "/api/public/chat";
const QUOTE_PROXY = "/api/public/quote";

const chatUrl = () => import.meta.env['VITE_N8N_WEBHOOK_URL'] || CHAT_PROXY;
const quoteUrl = () => import.meta.env['VITE_N8N_QUOTE_WEBHOOK_URL'] || QUOTE_PROXY;

const DEFAULT_TIMEOUT = 20_000;

async function postJson<T>(url: string, body: unknown, timeout = DEFAULT_TIMEOUT): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(timer);
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new N8nError("Request timed out", "timeout");
    }
    throw new N8nError("Network request failed", "network");
  }
  clearTimeout(timer);

  if (res.status === 501) throw new N8nError("Endpoint not configured", "not-configured");
  if (!res.ok) throw new N8nError(`Request failed with status ${res.status}`, "server");

  const text = await res.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new N8nError("Invalid response from server", "invalid");
  }
}

export function createSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `sess-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function sendChatMessage(input: {
  sessionId: string;
  message: string;
  language: Language;
  page: string;
}): Promise<ChatResponse> {
  const payload: ChatRequest = {
    sessionId: input.sessionId,
    message: input.message,
    language: input.language,
    page: input.page,
    timestamp: new Date().toISOString(),
    source: "website-chatbot",
  };

  const data = await postJson<Partial<ChatResponse>>(chatUrl(), payload, 30_000);
  if (!data || typeof data.reply !== "string" || !data.reply.trim()) {
    throw new N8nError("Invalid chat response", "invalid");
  }
  return {
    reply: data.reply,
    sessionId: data.sessionId ?? input.sessionId,
    language: data.language ?? input.language,
    lead: Boolean(data.lead),
    ...(data.leadId ? { leadId: data.leadId } : {}),
  };
}

export async function submitQuoteRequest(
  payload: Omit<QuotePayload, "source" | "timestamp">,
): Promise<{ ok: true }> {
  const full: QuotePayload = {
    ...payload,
    source: "website-quote-form",
    timestamp: new Date().toISOString(),
  };
  await postJson<unknown>(quoteUrl(), full, 25_000);
  return { ok: true };
}

export async function checkN8nHealth(): Promise<boolean> {
  try {
    const res = await fetch(chatUrl(), { method: "OPTIONS" });
    return res.ok || res.status === 204;
  } catch {
    return false;
  }
}
