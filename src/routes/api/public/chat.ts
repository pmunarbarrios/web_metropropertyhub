import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const chatSchema = z.object({
  sessionId: z.string().min(1).max(120),
  message: z.string().min(1).max(2000),
  language: z.enum(["en", "es"]),
  page: z.string().max(300),
  timestamp: z.string().max(60),
  source: z.literal("website-chatbot"),
});

export const Route = createFileRoute("/api/public/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhook = process.env["N8N_WEBHOOK_URL"];
        if (!webhook) {
          return Response.json({ error: "chat_not_configured" }, { status: 501 });
        }

        let parsed: z.infer<typeof chatSchema>;
        try {
          parsed = chatSchema.parse(await request.json());
        } catch {
          return Response.json({ error: "invalid_payload" }, { status: 400 });
        }

        try {
          const upstream = await fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed),
          });
          const text = await upstream.text();
          if (!upstream.ok) {
            return Response.json({ error: "upstream_error" }, { status: 502 });
          }
          return new Response(text || "{}", {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch {
          return Response.json({ error: "upstream_unreachable" }, { status: 502 });
        }
      },
    },
  },
});
