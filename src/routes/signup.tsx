import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, User, Car, Shield } from "lucide-react";
import { TopBar } from "@/components/mobile/TopBar";
import { MobileShell } from "@/components/mobile/MobileShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

const steps = [
  { id: 1, label: "Personal", icon: User },
  { id: 2, label: "Vehicle", icon: Car },
  { id: 3, label: "Security", icon: Shield },
];

const questions = [
  "What is your mother's maiden name?",
  "What was the name of your first pet?",
  "What city were you born in?",
  "What is your favorite teacher's name?",
  "What was your first vehicle plate number?",
];

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-primary">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:ring-4 focus:ring-accent/20"
      />
    </label>
  );
}

function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [agree, setAgree] = useState(false);
  const [q1, setQ1] = useState(questions[0]);
  const [q2, setQ2] = useState(questions[1]);

  const next = () => (step < 3 ? setStep(step + 1) : agree && navigate({ to: "/otp" }));
  const back = () => (step > 1 ? setStep(step - 1) : navigate({ to: "/" }));

  return (
    <MobileShell>
      <TopBar title="Create account" subtitle={`Step ${step} of 3`} onBack={back} />
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.id} className="flex flex-1 items-center">
              <div className={cn(
                "grid h-10 w-10 place-items-center rounded-full border-2 transition-all",
                step >= s.id ? "border-accent bg-gradient-accent text-primary shadow-glow" : "border-border bg-white text-muted-foreground",
              )}>
                {step > s.id ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
              </div>
              {i < steps.length - 1 && (
                <div className={cn("mx-2 h-1 flex-1 rounded-full", step > s.id ? "bg-accent" : "bg-border")} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[11px] font-semibold text-muted-foreground">
          {steps.map((s) => <span key={s.id}>{s.label}</span>)}
        </div>
      </div>

      <div className="mt-6 space-y-4 px-5">
        {step === 1 && (
          <>
            <Field label="First name" placeholder="Juan" />
            <Field label="Middle name" placeholder="Reyes" />
            <Field label="Last name" placeholder="Santos" />
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-primary">Sex</span>
              <div className="grid grid-cols-2 gap-2">
                {["Male", "Female"].map((s) => (
                  <button key={s} type="button" className="rounded-2xl border border-border bg-white py-3 text-sm font-semibold transition-all hover:border-accent hover:bg-accent-soft">
                    {s}
                  </button>
                ))}
              </div>
            </label>
            <Field label="Email (optional)" type="email" placeholder="juan@email.com" />
            <Field label="Create password" type="password" placeholder="••••••••" />
            <Field label="Confirm password" type="password" placeholder="••••••••" />
          </>
        )}
        {step === 2 && (
          <>
            <Field label="Cooperative name" placeholder="Manila Jeepney Coop" />
            <Field label="Plate number" placeholder="ABC-1234" />
            <Field label="Chassis number" placeholder="1HGCM82633A123456" />
            <Field label="Driver's license number" placeholder="N/A if not applicable" />
            <Field label="Mobile number" placeholder="+63 917 123 4567" />
          </>
        )}
        {step === 3 && (
          <>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-primary">Security question 1</span>
              <select value={q1} onChange={(e) => setQ1(e.target.value)} className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm">
                {questions.map((q) => <option key={q}>{q}</option>)}
              </select>
            </label>
            <Field label="Answer" placeholder="Your answer" />
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-primary">Security question 2</span>
              <select value={q2} onChange={(e) => setQ2(e.target.value)} className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm">
                {questions.map((q) => <option key={q}>{q}</option>)}
              </select>
            </label>
            <Field label="Answer" placeholder="Your answer" />
            <label className="mt-2 flex items-start gap-3 rounded-2xl bg-accent-soft p-4">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-5 w-5 accent-accent"
              />
              <span className="text-xs leading-relaxed text-primary">
                I agree to the <b>Terms of Service</b> and <b>Privacy Policy</b> of UPLIFT.
              </span>
            </label>
          </>
        )}

        <div className="flex gap-3 pt-4">
          <button
            onClick={back}
            className="flex-1 rounded-2xl border-2 border-primary/10 bg-white py-3.5 text-sm font-bold text-primary transition-all hover:bg-secondary active:scale-95"
          >
            Back
          </button>
          <button
            onClick={next}
            disabled={step === 3 && !agree}
            className="flex-1 rounded-2xl bg-gradient-accent py-3.5 text-sm font-bold text-primary shadow-glow transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
          >
            {step === 3 ? "Create account" : "Continue"}
          </button>
        </div>
      </div>
    </MobileShell>
  );
}