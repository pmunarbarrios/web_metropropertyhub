import { CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { quoteServiceOptions } from "@/data/services";
import { useI18n } from "@/i18n";
import { trackEvent } from "@/lib/analytics";
import { submitQuoteRequest } from "@/services/n8n";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  borough: string;
  address: string;
  details: string;
};

const EMPTY: FormState = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  borough: "",
  address: "",
  details: "",
};

const boroughs = ["Staten Island", "Brooklyn", "Queens", "Manhattan", "Bronx"];

export function QuoteForm({ initialService }: { initialService?: string }) {
  const { lang, t } = useI18n();
  const [values, setValues] = useState<FormState>({
    ...EMPTY,
    service: matchService(initialService),
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [started, setStarted] = useState(false);

  const set = (field: keyof FormState, value: string) => {
    if (!started) {
      setStarted(true);
      trackEvent("quote_form_started");
    }
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.fullName.trim()) next.fullName = t("err.required");
    if (values.phone.replace(/\D/g, "").length < 7) next.phone = t("err.phone");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = t("err.email");
    if (!values.service) next.service = t("err.select");
    if (!values.borough) next.borough = t("err.select");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setStatus("sending");
    setErrorMessage("");

    try {
      await submitQuoteRequest({
        fullName: values.fullName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        service:
          quoteServiceOptions("en").find((option) => option.value === values.service)?.label ??
          values.service,
        borough: values.borough,
        address: values.address.trim(),
        details: values.details.trim(),
      });
      trackEvent("quote_form_submitted", { service: values.service });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("We couldn't submit your request — please call us at (646) 456-6547");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold">{t("quote.successTitle")}</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">{t("quote.success")}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild variant="default">
            <Link to="/">{t("common.backHome")}</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setValues({ ...EMPTY, service: matchService(initialService) });
              setErrors({});
              setStatus("idle");
              setStarted(false);
            }}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {t("quote.another")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="fullName"
          label={t("quote.fullName")}
          value={values.fullName}
          onChange={(value) => set("fullName", value)}
          error={errors.fullName}
          autoComplete="name"
          required
        />
        <FormField
          id="phone"
          label={t("quote.phone")}
          type="tel"
          value={values.phone}
          onChange={(value) => set("phone", value)}
          error={errors.phone}
          autoComplete="tel"
          required
        />
        <FormField
          id="email"
          label={t("quote.email")}
          type="email"
          value={values.email}
          onChange={(value) => set("email", value)}
          error={errors.email}
          autoComplete="email"
          required
        />
        <SelectField
          id="service"
          label={t("quote.service")}
          value={values.service}
          onChange={(value) => set("service", value)}
          error={errors.service}
          required
        >
          <option value="">{t("quote.selectService")}</option>
          {quoteServiceOptions(lang).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
        <SelectField
          id="borough"
          label={t("quote.borough")}
          value={values.borough}
          onChange={(value) => set("borough", value)}
          error={errors.borough}
          required
        >
          <option value="">{t("quote.selectBorough")}</option>
          {boroughs.map((borough) => (
            <option key={borough} value={borough}>
              {borough}
            </option>
          ))}
        </SelectField>
        <FormField
          id="address"
          label={t("quote.addressOrPostalCode")}
          value={values.address}
          onChange={(value) => set("address", value)}
          error={errors.address}
          autoComplete="street-address"
        />
      </div>
      <div className="mt-5">
        <Label htmlFor="details">{t("quote.details")}</Label>
        <Textarea
          id="details"
          rows={4}
          className="mt-2"
          placeholder={t("quote.detailsPh")}
          value={values.details}
          onChange={(event) => set("details", event.target.value)}
          maxLength={3000}
        />
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground"
        >
          <span>{errorMessage}</span>
          <Button type="button" variant="outline" size="sm" onClick={() => void submit()}>
            {t("err.tryAgain")}
          </Button>
        </div>
      ) : null}

      <div className="mt-8 flex justify-end">
        <Button type="submit" variant="quote" size="lg" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            "Get Your Free Quote"
          )}
        </Button>
      </div>
    </form>
  );
}

function matchService(slug?: string) {
  if (!slug) return "";
  return quoteServiceOptions("en").some((option) => option.value === slug) ? slug : "";
}

function FormField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  required = false,
}: {
  id: keyof Pick<FormState, "fullName" | "phone" | "email" | "address">;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: "text" | "tel" | "email";
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        className="mt-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete={autoComplete}
        maxLength={200}
        required={required}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  children,
}: {
  id: "service" | "borough";
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        className="mt-2 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        required={required}
      >
        {children}
      </select>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-destructive">
      {message}
    </p>
  );
}
