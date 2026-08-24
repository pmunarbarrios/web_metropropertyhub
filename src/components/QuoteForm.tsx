import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { quoteServiceOptions } from "@/data/services";
import { useI18n } from "@/i18n";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { N8nError, submitQuoteRequest } from "@/services/n8n";

type FormState = {
  service: string;
  propertyType: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  fullName: string;
  phone: string;
  email: string;
  projectDetails: string;
  preferredContactMethod: string;
};

const EMPTY: FormState = {
  service: "",
  propertyType: "",
  address: "",
  city: "",
  state: "NY",
  zipCode: "",
  fullName: "",
  phone: "",
  email: "",
  projectDetails: "",
  preferredContactMethod: "",
};

const TOTAL_STEPS = 6;

export function QuoteForm({ initialService }: { initialService?: string }) {
  const { lang, t } = useI18n();
  const [step, setStep] = useState(1);
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
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (current: number) => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (current === 1 && !values.service) next.service = t("err.select");
    if (current === 2 && !values.propertyType) next.propertyType = t("err.select");
    if (current === 3) {
      if (!values.address.trim()) next.address = t("err.required");
      if (!values.city.trim()) next.city = t("err.required");
      if (!values.state.trim()) next.state = t("err.required");
      if (!/^\d{5}(-\d{4})?$/.test(values.zipCode.trim())) next.zipCode = t("err.zip");
    }
    if (current === 4) {
      if (!values.fullName.trim()) next.fullName = t("err.required");
      if (values.phone.replace(/\D/g, "").length < 7) next.phone = t("err.phone");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) next.email = t("err.email");
    }
    if (current === 5 && values.projectDetails.trim().length < 5)
      next.projectDetails = t("err.required");
    if (current === 6 && !values.preferredContactMethod)
      next.preferredContactMethod = t("err.select");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };

  const submit = async () => {
    if (!validateStep(6)) return;
    setStatus("sending");
    setErrorMessage("");
    try {
      await submitQuoteRequest({
        language: lang,
        fullName: values.fullName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        propertyType: values.propertyType,
        service: values.service,
        address: values.address.trim(),
        city: values.city.trim(),
        state: values.state.trim(),
        zipCode: values.zipCode.trim(),
        projectDetails: values.projectDetails.trim(),
        preferredContactMethod: values.preferredContactMethod,
      });
      trackEvent("quote_form_submitted", { service: values.service });


      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof N8nError && error.kind === "not-configured"
          ? t("quote.notConfigured")
          : t("err.network"),
      );
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
              setValues(EMPTY);
              setStep(1);
              setStatus("idle");
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
      onSubmit={(e) => {
        e.preventDefault();
        if (step < TOTAL_STEPS) goNext();
        else void submit();
      }}
      noValidate
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-muted-foreground">
          {t("quote.step")} {step} {t("quote.of")} {TOTAL_STEPS}
        </p>
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i < step ? "bg-accent" : "bg-secondary",
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-7 min-h-[16rem]">
        {step === 1 && (
          <fieldset>
            <legend className="text-lg font-semibold">{t("quote.s1")}</legend>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {quoteServiceOptions(lang).map((option) => (
                <OptionButton
                  key={option.value}
                  label={option.label}
                  selected={values.service === option.value}
                  onSelect={() => set("service", option.value)}
                />
              ))}
            </div>
            <FieldError message={errors.service} />
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="text-lg font-semibold">{t("quote.s2")}</legend>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              <OptionButton
                label={t("quote.commercial")}
                selected={values.propertyType === "Commercial"}
                onSelect={() => set("propertyType", "Commercial")}
              />
              <OptionButton
                label={t("quote.residential")}
                selected={values.propertyType === "Residential"}
                onSelect={() => set("propertyType", "Residential")}
              />
            </div>
            <FieldError message={errors.propertyType} />
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold">{t("quote.s3")}</legend>
            <Field
              id="address"
              label={t("quote.address")}
              value={values.address}
              onChange={(v) => set("address", v)}
              error={errors.address}
              autoComplete="street-address"
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field
                id="city"
                label={t("quote.city")}
                value={values.city}
                onChange={(v) => set("city", v)}
                error={errors.city}
                autoComplete="address-level2"
              />
              <Field
                id="state"
                label={t("quote.state")}
                value={values.state}
                onChange={(v) => set("state", v)}
                error={errors.state}
                autoComplete="address-level1"
              />
              <Field
                id="zipCode"
                label={t("quote.zip")}
                value={values.zipCode}
                onChange={(v) => set("zipCode", v)}
                error={errors.zipCode}
                inputMode="numeric"
                autoComplete="postal-code"
              />
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold">{t("quote.s4")}</legend>
            <Field
              id="fullName"
              label={t("quote.fullName")}
              value={values.fullName}
              onChange={(v) => set("fullName", v)}
              error={errors.fullName}
              autoComplete="name"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="phone"
                label={t("quote.phone")}
                type="tel"
                value={values.phone}
                onChange={(v) => set("phone", v)}
                error={errors.phone}
                autoComplete="tel"
              />
              <Field
                id="email"
                label={t("quote.email")}
                type="email"
                value={values.email}
                onChange={(v) => set("email", v)}
                error={errors.email}
                autoComplete="email"
              />
            </div>
          </fieldset>
        )}

        {step === 5 && (
          <fieldset>
            <legend className="text-lg font-semibold">{t("quote.s5")}</legend>
            <div className="mt-5">
              <Label htmlFor="projectDetails">{t("quote.details")}</Label>
              <Textarea
                id="projectDetails"
                rows={6}
                className="mt-2"
                placeholder={t("quote.detailsPh")}
                value={values.projectDetails}
                onChange={(e) => set("projectDetails", e.target.value)}
                aria-invalid={Boolean(errors.projectDetails)}
                maxLength={3000}
              />
              <FieldError message={errors.projectDetails} />
            </div>
          </fieldset>
        )}

        {step === 6 && (
          <fieldset>
            <legend className="text-lg font-semibold">{t("quote.s6")}</legend>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
              {[
                { value: "Phone", label: t("quote.byPhone") },
                { value: "Email", label: t("quote.byEmail") },
                { value: "Text Message", label: t("quote.byText") },
              ].map((option) => (
                <OptionButton
                  key={option.value}
                  label={option.label}
                  selected={values.preferredContactMethod === option.value}
                  onSelect={() => set("preferredContactMethod", option.value)}
                />
              ))}
            </div>
            <FieldError message={errors.preferredContactMethod} />
          </fieldset>
        )}
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground"
        >
          <span>{errorMessage}</span>
          <Button type="button" variant="outline" size="sm" onClick={() => void submit()}>
            {t("err.tryAgain")}
          </Button>
        </div>
      ) : null}

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1 || status === "sending"}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("quote.back")}
        </Button>
        <Button type="submit" variant="quote" size="lg" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {t("quote.sending")}
            </>
          ) : (
            <>
              {step < TOTAL_STEPS ? t("quote.next") : t("quote.submit")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function matchService(slugOrName?: string) {
  if (!slugOrName) return "";
  const normalized = slugOrName.replace(/-/g, " ").toLowerCase();
  const found = quoteServiceOptions("en").find(
    (o) => o.value.toLowerCase() === normalized || o.value.toLowerCase().includes(normalized),
  );
  return found?.value ?? "";
}

function OptionButton({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all",
        selected
          ? "border-accent bg-accent/12 text-foreground shadow-[var(--shadow-soft)]"
          : "border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
  type?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  autoComplete?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        className="mt-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...(inputMode ? { inputMode } : {})}
        {...(autoComplete ? { autoComplete } : {})}
        maxLength={200}
      />
      <FieldError message={error} id={`${id}-error`} />
    </div>
  );
}

function FieldError({ message, id }: { message?: string | undefined; id?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-destructive">
      {message}
    </p>
  );
}
