import { Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { trackEvent } from "@/lib/analytics";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <div className="flex items-center gap-2">
        <a
          href="tel:+16464566547"
          onClick={() => trackEvent("phone_clicked", { location: "mobile_bar" })}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-background text-sm font-semibold text-foreground"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call Now
        </a>
        <Link
          to="/request-a-quote"
          onClick={() => trackEvent("quote_button_clicked", { location: "mobile_bar" })}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
