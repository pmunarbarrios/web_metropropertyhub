import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const quoteSchema = z.object({
  source: z.literal("website-quote-form"),
  language: z.enum(["en", "es"]),
  fullName: z.string().min(1).max(120),
  phone: z.string().min(5).max(40),
  email: z.string().email().max(200),
  propertyType: z.string().max(60),
  service: z.string().max(80),
  borough: z.string().min(1).max(80),
  address: z.string().max(200),
  city: z.string().max(80),
  state: z.string().max(40),
  zipCode: z.string().max(15),
  projectDetails: z.string().max(3000),
  preferredContactMethod: z.string().max(40),
  timestamp: z.string().max(60),
});

export const Route = createFileRoute("/api/public/quote")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhook = process.env["N8N_QUOTE_WEBHOOK_URL"];
        if (!webhook) {
          return Response.json({ error: "quote_not_configured" }, { status: 501 });
        }

        let parsed: z.infer<typeof quoteSchema>;
        try {
          parsed = quoteSchema.parse(await request.json());
        } catch {
          return Response.json({ error: "invalid_payload" }, { status: 400 });
        }

        try {
          const upstream = await fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed),
          });
          if (!upstream.ok) {
            return Response.json({ error: "upstream_error" }, { status: 502 });
          }
          return Response.json({ ok: true });
        } catch {
          return Response.json({ error: "upstream_unreachable" }, { status: 502 });
        }
      },
    },
  },
});
