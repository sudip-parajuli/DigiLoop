"use client";
import { useState, useRef } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";

const services = [
  "Website Design", "Digital Invitations", "Social Media Management",
  "Digital Marketing", "Automation", "AI Integration", "Graphic Design", "Print & Branding", "Other",
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [budget, setBudget] = useState(25000);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {};
    if (!data.get("name")) errs.name = "Name is required";
    const email = data.get("email") as string;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Valid email required";
    if (!data.get("message")) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          service: data.get("service"),
          budget,
          message: data.get("message"),
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
        setBudget(25000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 gap-4">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="text-[var(--color-ink)]">Message sent!</h3>
        <p className="text-[var(--color-muted)] max-w-sm">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-[var(--color-accent2)] underline underline-offset-4"
          style={{ cursor: "none" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-1">
      <h3 className="text-[var(--color-ink)] mb-8">Tell us about your project</h3>

      {/* Name */}
      <div className="form-group">
        <input
          type="text"
          name="name"
          id="name"
          className="form-input"
          placeholder=" "
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        <label htmlFor="name" className="form-label">Your Name *</label>
        {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1 pl-1">{errors.name}</p>}
      </div>

      {/* Email + Phone row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-group">
          <input type="email" name="email" id="email" className="form-input" placeholder=" "
            aria-describedby={errors.email ? "email-error" : undefined} />
          <label htmlFor="email" className="form-label">Email Address *</label>
          {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1 pl-1">{errors.email}</p>}
        </div>
        <div className="form-group">
          <input type="tel" name="phone" id="phone" className="form-input" placeholder=" " />
          <label htmlFor="phone" className="form-label">Phone (optional)</label>
        </div>
      </div>

      {/* Service */}
      <div className="form-group">
        <select
          name="service"
          id="service"
          className="form-input"
          style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem" }}
        >
          <option value="">Select a service</option>
          {services.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Budget Slider */}
      <div className="mb-6 pt-2">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-[var(--color-ink)]">Budget</label>
          <span
            className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{ background: "var(--color-accent2)", color: "#fff", fontFamily: "var(--font-mono)" }}
          >
            NPR {budget.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={5000}
          max={500000}
          step={5000}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{ background: `linear-gradient(to right, var(--color-accent2) 0%, var(--color-accent2) ${((budget - 5000) / (500000 - 5000)) * 100}%, var(--color-border) ${((budget - 5000) / (500000 - 5000)) * 100}%, var(--color-border) 100%)` }}
          aria-label="Budget slider"
        />
        <div className="flex justify-between text-xs text-[var(--color-muted)] mt-1 font-mono">
          <span>NPR 5K</span><span>NPR 5L+</span>
        </div>
      </div>

      {/* Message */}
      <div className="form-group">
        <textarea
          name="message"
          id="message"
          rows={5}
          className="form-input resize-none"
          placeholder=" "
          style={{ paddingTop: "1.5rem" }}
          aria-describedby={errors.message ? "msg-error" : undefined}
        />
        <label htmlFor="message" className="form-label">Your Message *</label>
        {errors.message && <p id="msg-error" className="text-red-500 text-xs mt-1 pl-1">{errors.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm">Something went wrong. Please try again or WhatsApp us directly.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary w-full py-4 text-base mt-2 justify-center disabled:opacity-60"
      >
        {status === "loading" ? (
          <><Loader2 size={18} className="animate-spin" /> Sending...</>
        ) : (
          <><Send size={18} /> Send Message</>
        )}
      </button>
    </form>
  );
}
