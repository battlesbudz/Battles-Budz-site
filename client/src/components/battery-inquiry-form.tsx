import { type FormEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { nanoid } from "nanoid";
import { Link } from "wouter";
import type { BatteryInquiryInput } from "@shared/battery-inquiries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCampaignAttribution } from "@/lib/campaign-attribution";
import { apiRequest } from "@/lib/queryClient";

type InquiryKind = "personal" | "wholesale";

type BatteryInquiryFormProps = {
  id: string;
  kind: InquiryKind;
};

type InquiryFields = {
  name: string;
  email: string;
  phone: string;
  location: string;
  quantity: string;
  businessName: string;
  notes: string;
  website: string;
};

type FieldErrors = Partial<Record<keyof InquiryFields, string>>;

const initialFields: InquiryFields = {
  name: "",
  email: "",
  phone: "",
  location: "",
  quantity: "1",
  businessName: "",
  notes: "",
  website: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fieldIdSuffix: Partial<Record<keyof InquiryFields, string>> = {
  name: "name",
  email: "email",
  location: "location",
  quantity: "quantity",
  businessName: "business",
};

function validateInquiry(kind: InquiryKind, fields: InquiryFields): FieldErrors {
  const errors: FieldErrors = {};

  if (fields.name.trim().length < 2) errors.name = "Enter your name.";
  if (!emailPattern.test(fields.email.trim())) errors.email = "Enter a valid email address.";
  if (!fields.location.trim()) errors.location = "Enter your city and state or ZIP code.";
  if (!/^\d+$/.test(fields.quantity) || Number(fields.quantity) < 1 || Number(fields.quantity) > 10_000) {
    errors.quantity = "Enter a quantity from 1 to 10,000.";
  }
  if (kind === "wholesale" && fields.businessName.trim().length < 2) {
    errors.businessName = "Enter your business name.";
  }

  return errors;
}

export function BatteryInquiryForm({ id, kind }: BatteryInquiryFormProps) {
  const [fields, setFields] = useState<InquiryFields>(initialFields);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [idempotencyKey, setIdempotencyKey] = useState(() => nanoid());
  const nameInputRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const mutation = useMutation({
    mutationFn: (payload: BatteryInquiryInput) => apiRequest("POST", "/api/battery-inquiries", payload),
  });

  useEffect(() => {
    if (mutation.isSuccess) successHeadingRef.current?.focus();
  }, [mutation.isSuccess]);

  const isWholesale = kind === "wholesale";
  const title = isWholesale ? "Request wholesale details" : "Request battery availability";
  const description = isWholesale
    ? "Tell us about your store or licensed retail business. We’ll follow up with current availability and next steps."
    : "Tell us where you are and how many batteries you need. We’ll reply with current availability and the fulfillment options available for your location.";

  const updateField = (field: keyof InquiryFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (mutation.isError) {
      setIdempotencyKey(nanoid());
      mutation.reset();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateInquiry(kind, fields);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstInvalidField = Object.keys(errors)[0] as keyof InquiryFields;
      window.requestAnimationFrame(() => {
        const suffix = fieldIdSuffix[firstInvalidField];
        if (suffix) document.getElementById(`${id}-${suffix}`)?.focus();
      });
      return;
    }

    setFieldErrors({});
    const commonPayload = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim() || undefined,
      location: fields.location.trim(),
      quantity: Number(fields.quantity),
      notes: fields.notes.trim() || undefined,
      idempotencyKey,
      website: fields.website,
      source: getCampaignAttribution(),
    };

    const payload: BatteryInquiryInput = isWholesale
      ? { ...commonPayload, inquiryType: "wholesale", businessName: fields.businessName.trim() }
      : { ...commonPayload, inquiryType: "consumer" };

    mutation.mutate(payload);
  };

  const startAnotherRequest = () => {
    setFields(initialFields);
    setFieldErrors({});
    setIdempotencyKey(nanoid());
    mutation.reset();
    window.requestAnimationFrame(() => nameInputRef.current?.focus());
  };

  return (
    <section
      id={id}
      data-battery-inquiry={kind}
      className="scroll-mt-28 border border-[rgba(255,220,18,.35)] bg-[#0c0c0c] p-7 text-left text-white shadow-2xl shadow-black/30 sm:p-9"
      aria-labelledby={`${id}-title`}
    >
      {mutation.isSuccess ? (
        <div className="py-6" role="status" aria-live="polite">
          <CheckCircle2 className="h-10 w-10 text-[#ffdc12]" aria-hidden="true" />
          <h2
            ref={successHeadingRef}
            id={`${id}-title`}
            tabIndex={-1}
            className="mt-5 text-3xl font-black uppercase tracking-[-0.04em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffdc12]"
          >
            Request received.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-zinc-300">
            Thanks, {fields.name.trim()}. We’ll reply to {fields.email.trim()} with availability and next steps. No order was placed, no payment was collected, and inventory is not reserved.
          </p>
          <Button
            type="button"
            onClick={startAnotherRequest}
            variant="outline"
            className="mt-6 min-h-11 border-[#ffdc12] bg-transparent font-black uppercase tracking-[0.12em] text-[#fff080] hover:bg-[#ffdc12] hover:text-black"
          >
            Send another request
          </Button>
        </div>
      ) : (
        <>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffdc12]">
            {isWholesale ? "For retailers and dispensaries" : "For personal purchase"}
          </p>
          <h2 id={`${id}-title`} tabIndex={-1} className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffdc12] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-zinc-300">{description}</p>

          <form className="mt-7 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate aria-busy={mutation.isPending}>
            <div hidden>
              <label htmlFor={`${id}-website`}>Website</label>
              <input
                id={`${id}-website`}
                name="website"
                value={fields.website}
                onChange={(event) => updateField("website", event.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div>
              <Label htmlFor={`${id}-name`} className="text-sm font-bold text-white">Name</Label>
              <Input
                ref={nameInputRef}
                id={`${id}-name`}
                name="name"
                autoComplete="name"
                value={fields.name}
                onChange={(event) => updateField("name", event.target.value)}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? `${id}-name-error` : undefined}
                className="mt-2 h-12 border-white/30 bg-black text-white"
                maxLength={120}
                required
              />
              {fieldErrors.name ? <p id={`${id}-name-error`} className="mt-2 text-sm text-red-300" role="alert">{fieldErrors.name}</p> : null}
            </div>

            <div>
              <Label htmlFor={`${id}-email`} className="text-sm font-bold text-white">Email</Label>
              <Input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={(event) => updateField("email", event.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? `${id}-email-error` : undefined}
                className="mt-2 h-12 border-white/30 bg-black text-white"
                maxLength={254}
                required
              />
              {fieldErrors.email ? <p id={`${id}-email-error`} className="mt-2 text-sm text-red-300" role="alert">{fieldErrors.email}</p> : null}
            </div>

            {isWholesale ? (
              <div>
                <Label htmlFor={`${id}-business`} className="text-sm font-bold text-white">Business name</Label>
                <Input
                  id={`${id}-business`}
                  name="businessName"
                  autoComplete="organization"
                  value={fields.businessName}
                  onChange={(event) => updateField("businessName", event.target.value)}
                  aria-invalid={Boolean(fieldErrors.businessName)}
                  aria-describedby={fieldErrors.businessName ? `${id}-business-error` : undefined}
                  className="mt-2 h-12 border-white/30 bg-black text-white"
                  maxLength={160}
                  required
                />
                {fieldErrors.businessName ? <p id={`${id}-business-error`} className="mt-2 text-sm text-red-300" role="alert">{fieldErrors.businessName}</p> : null}
              </div>
            ) : null}

            <div>
              <Label htmlFor={`${id}-phone`} className="text-sm font-bold text-white">Phone <span className="font-normal text-zinc-400">(optional)</span></Label>
              <Input
                id={`${id}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                value={fields.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="mt-2 h-12 border-white/30 bg-black text-white"
                maxLength={40}
              />
            </div>

            <div>
              <Label htmlFor={`${id}-location`} className="text-sm font-bold text-white">City and state or ZIP code</Label>
              <Input
                id={`${id}-location`}
                name="location"
                autoComplete="postal-code"
                value={fields.location}
                onChange={(event) => updateField("location", event.target.value)}
                aria-invalid={Boolean(fieldErrors.location)}
                aria-describedby={fieldErrors.location ? `${id}-location-error` : undefined}
                className="mt-2 h-12 border-white/30 bg-black text-white"
                maxLength={120}
                required
              />
              {fieldErrors.location ? <p id={`${id}-location-error`} className="mt-2 text-sm text-red-300" role="alert">{fieldErrors.location}</p> : null}
            </div>

            <div>
              <Label htmlFor={`${id}-quantity`} className="text-sm font-bold text-white">
                {isWholesale ? "Estimated opening quantity" : "Quantity"}
              </Label>
              <Input
                id={`${id}-quantity`}
                name="quantity"
                type="number"
                inputMode="numeric"
                min={1}
                max={10000}
                value={fields.quantity}
                onChange={(event) => updateField("quantity", event.target.value)}
                aria-invalid={Boolean(fieldErrors.quantity)}
                aria-describedby={fieldErrors.quantity ? `${id}-quantity-error` : undefined}
                className="mt-2 h-12 border-white/30 bg-black text-white"
                required
              />
              {fieldErrors.quantity ? <p id={`${id}-quantity-error`} className="mt-2 text-sm text-red-300" role="alert">{fieldErrors.quantity}</p> : null}
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor={`${id}-notes`} className="text-sm font-bold text-white">
                {isWholesale ? "Store count, timing, or questions" : "Cartridge details or questions"} <span className="font-normal text-zinc-400">(optional)</span>
              </Label>
              <Textarea
                id={`${id}-notes`}
                name="notes"
                value={fields.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                className="mt-2 min-h-28 border-white/30 bg-black text-white"
                maxLength={1000}
              />
            </div>

            <div className="sm:col-span-2">
              {mutation.isError ? (
                <p className="mb-4 text-sm text-red-300" role="alert">
                  We couldn’t save your request. Please try again or email battlesbudz@gmail.com.
                </p>
              ) : null}
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="min-h-[52px] bg-[#ffdc12] px-7 font-black uppercase tracking-[0.12em] text-black hover:bg-[#fff080]"
              >
                {mutation.isPending ? <LoaderCircle className="mr-2 h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : null}
                {mutation.isPending ? "Sending request" : isWholesale ? "Send wholesale request" : "Request availability"}
              </Button>
              <p className="mt-4 max-w-3xl text-xs leading-5 text-zinc-400">
                This is an inquiry, not an order. No payment is collected and inventory is not reserved. Battles Budz will confirm availability, shipping eligibility and cost, tax, and next steps before any purchase. See our{" "}
                <Link href="/privacy-policy" className="font-bold text-[#fff080] underline underline-offset-4 hover:text-white">privacy policy</Link>.
              </p>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
