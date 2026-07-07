import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, User, Car, Shield, ArrowLeft } from "lucide-react";
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
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-semibold text-[#ffffff]">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-[#ffffff]/20 bg-[#ffffff]/5 px-4 py-3.5 text-sm text-[#ffffff] outline-none transition-all placeholder:text-[#8c8b88] focus:border-[#f5a623] focus:bg-[#ffffff]/10 focus:ring-4 focus:ring-[#f5a623]/10"
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
  const [sex, setSex] = useState<"Male" | "Female" | null>(null);

  const next = () => (step < 3 ? setStep(step + 1) : agree && navigate({ to: "/otp" }));
  const back = () => (step > 1 ? setStep(step - 1) : navigate({ to: "/" }));

  return (
    <MobileShell className="relative flex min-h-screen flex-col overflow-y-auto bg-[#1b2b4b] font-sans text-[#ffffff]">
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#f5a623] opacity-10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-96 w-96 rounded-full bg-[#ffffff] opacity-5 blur-[120px]" />

      <div className="sticky top-0 z-20 flex items-center gap-4 bg-[#1b2b4b]/90 px-6 pt-8 pb-4 backdrop-blur-md">
        <button
          onClick={back}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff]/10 transition-all hover:bg-[#f5a623] hover:text-[#1b2b4b] active:scale-90"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-wide text-[#ffffff]">
            CREATE AN ACCOUNT
          </h1>
          <p className="text-xs font-medium text-[#8c8b88]">Step {step} of 3</p>
        </div>
      </div>

      <div className="relative z-10 px-6 pt-6">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.id} className={cn("flex items-center", i < steps.length - 1 ? "flex-1" : "")}>
              <div className="relative flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300",
                    step > s.id
                      ? "bg-[#f5a623] text-[#1b2b4b] shadow-[0_0_15px_rgba(245,166,35,0.4)]"
                      : step === s.id
                      ? "bg-[#f5a623] text-[#1b2b4b] shadow-[0_0_15px_rgba(245,166,35,0.4)] scale-110"
                      : "border-2 border-[#ffffff]/15 bg-[#1b2b4b] text-[#8c8b88]"
                  )}
                >
                  {step > s.id ? <Check className="h-5 w-5" strokeWidth={3} /> : <s.icon className="h-5 w-5" strokeWidth={step === s.id ? 2.5 : 2} />}
                </div>
                <span
                  className={cn(
                    "absolute -bottom-6 w-max text-[11px] font-bold tracking-wider transition-colors duration-300",
                    step >= s.id ? "text-[#f5a623]" : "text-[#8c8b88]"
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-3 h-[3px] flex-1 rounded-full transition-colors duration-500",
                    step > s.id ? "bg-[#f5a623]" : "bg-[#ffffff]/10"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-20 flex flex-col gap-2 px-6 pb-3">
        {step === 1 && (
          <>
            <Field label="First name" placeholder="Juan" />
            <Field label="Middle name" placeholder="Reyes" />
            <Field label="Last name" placeholder="Santos" />
            
            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold text-[#ffffff]">Sex</span>
              <div className="flex gap-3">
                <button
                  onClick={() => setSex("Male")}
                  className={cn(
                    "flex-1 rounded-2xl border py-3.5 text-sm font-semibold transition-all active:scale-95",
                    sex === "Male"
                      ? "border-[#f5a623] bg-[#f5a623]/15 text-[#f5a623] shadow-[0_0_15px_rgba(245,166,35,0.2)]"
                      : "border-[#ffffff]/20 bg-[#ffffff]/5 text-[#ffffff] hover:border-[#ffffff]/40 hover:bg-[#ffffff]/10"
                  )}
                >
                  Male
                </button>
                <button
                  onClick={() => setSex("Female")}
                  className={cn(
                    "flex-1 rounded-2xl border py-3.5 text-sm font-semibold transition-all active:scale-95",
                    sex === "Female"
                      ? "border-[#f5a623] bg-[#f5a623]/15 text-[#f5a623] shadow-[0_0_15px_rgba(245,166,35,0.2)]"
                      : "border-[#ffffff]/20 bg-[#ffffff]/5 text-[#ffffff] hover:border-[#ffffff]/40 hover:bg-[#ffffff]/10"
                  )}
                >
                  Female
                </button>
              </div>
            </div>

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
            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold text-[#ffffff]">Security question 1</span>
              <select 
                value={q1} 
                onChange={(e) => setQ1(e.target.value)} 
                className="w-full appearance-none rounded-2xl border border-[#ffffff]/20 bg-[#ffffff]/5 px-4 py-3.5 text-sm text-[#ffffff] outline-none transition-all focus:border-[#f5a623] focus:bg-[#ffffff]/10 focus:ring-4 focus:ring-[#f5a623]/10"
              >
                {questions.map((q) => <option key={q} className="bg-[#1b2b4b] text-[#ffffff]">{q}</option>)}
              </select>
            </label>
            <Field label="Answer" placeholder="Your answer" />
            
            <label className="flex flex-col gap-1.5 mt-2">
              <span className="text-[13px] font-semibold text-[#ffffff]">Security question 2</span>
              <select 
                value={q2} 
                onChange={(e) => setQ2(e.target.value)} 
                className="w-full appearance-none rounded-2xl border border-[#ffffff]/20 bg-[#ffffff]/5 px-4 py-3.5 text-sm text-[#ffffff] outline-none transition-all focus:border-[#f5a623] focus:bg-[#ffffff]/10 focus:ring-4 focus:ring-[#f5a623]/10"
              >
                {questions.map((q) => <option key={q} className="bg-[#1b2b4b] text-[#ffffff]">{q}</option>)}
              </select>
            </label>
            <Field label="Answer" placeholder="Your answer" />

            <label className="mt-4 flex items-start gap-3 rounded-2xl border border-[#f5a623]/30 bg-[#f5a623]/10 p-4 shadow-[inset_0_0_15px_rgba(245,166,35,0.05)] cursor-pointer transition-colors hover:bg-[#f5a623]/20">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#f5a623] cursor-pointer"
              />
              <span className="text-[13px] leading-relaxed text-[#ffffff]">
                I agree to the <strong className="text-[#f5a623]">Terms of Service</strong> and <strong className="text-[#f5a623]">Privacy Policy</strong> of UPLIFT.
              </span>
            </label>
          </>
        )}

        <div className="mt-4 flex gap-1 pb-0">
          <button
            onClick={back}
            className="flex-1 rounded-full border border-[#ffffff]/40 bg-transparent py-4 text-[15px] font-bold text-[#ffffff] transition-all hover:bg-[#ffffff]/10 active:scale-95"
          >
            Back
          </button>
          <button
            onClick={next}
            disabled={step === 3 && !agree}
            className="flex-1 rounded-full bg-[#f5a623] py-1 text-[15px] font-bold text-[#1b2b4b] shadow-[0_4px_20px_rgba(245,166,35,0.25)] transition-all hover:scale-[1.02] hover:shadow-[0_4px_25px_rgba(245,166,35,0.4)] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-[0_4px_20px_rgba(245,166,35,0.25)]"
          >
            {step === 3 ? "Create account" : "Continue"}
          </button>
        </div>
      </div>
    </MobileShell>
  );
}