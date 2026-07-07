import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import React from "react";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function Field({ label, hint, ...props }: { label: string, hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-semibold text-[#ffffff]">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-[#ffffff]/20 bg-[#ffffff]/5 px-4 py-3.5 text-sm text-[#ffffff] outline-none transition-all placeholder:text-[#8c8b88] focus:border-[#f5a623] focus:bg-[#ffffff]/10 focus:ring-4 focus:ring-[#f5a623]/10"
      />
      {hint && <span className="pl-1 text-[11px] font-medium text-[#8c8b88]">{hint}</span>}
    </label>
  );
}

function ForgotPasswordPage() {
  const navigate = useNavigate();

  return (
    <MobileShell className="relative flex min-h-screen flex-col overflow-x-hidden overflow-y-auto bg-[#1b2b4b] font-sans text-[#ffffff]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff_1.5px,transparent_1.5px)] bg-[length:24px_24px] opacity-[0.07] mix-blend-overlay" />
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#f5a623] opacity-10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-96 w-96 rounded-full bg-[#ffffff] opacity-5 blur-[120px]" />

      <div className="sticky top-0 z-20 flex items-center gap-4 bg-[#1b2b4b]/90 px-6 pb-10 pt-8 backdrop-blur-md">
        <button
          onClick={() => navigate({ to: "/login" })}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffffff]/10 transition-all hover:bg-[#f5a623] hover:text-[#1b2b4b] active:scale-90"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-[17px] font-bold uppercase tracking-wide text-[#ffffff]">
            RESET YOUR PASSWORD
          </h1>
          <p className="text-[11px] font-medium text-[#8c8b88]">
            Confirm identity first, then set a new password.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col px-6 pb-8 pt-4">
        <div className="flex flex-col gap-6">
          <Field 
            label="Phone Number" 
            placeholder="+63 9XX XXX XXXX" 
            type="tel" 
          />

          <div className="flex flex-col gap-4 rounded-[24px] border border-[#ffffff]/10 bg-[#ffffff]/5 p-5">
            <h3 className="text-[13px] font-bold text-[#ffffff]">Answer your security questions</h3>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-medium text-[#8c8b88]">What city were you born in?</span>
                <input
                  placeholder="Answer"
                  className="w-full rounded-2xl border border-[#ffffff]/20 bg-[#ffffff]/5 px-4 py-3 text-sm text-[#ffffff] outline-none transition-all placeholder:text-[#8c8b88] focus:border-[#f5a623] focus:bg-[#ffffff]/10 focus:ring-4 focus:ring-[#f5a623]/10"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-medium text-[#8c8b88]">Your elementary school?</span>
                <input
                  placeholder="Answer"
                  className="w-full rounded-2xl border border-[#ffffff]/20 bg-[#ffffff]/5 px-4 py-3 text-sm text-[#ffffff] outline-none transition-all placeholder:text-[#8c8b88] focus:border-[#f5a623] focus:bg-[#ffffff]/10 focus:ring-4 focus:ring-[#f5a623]/10"
                />
              </label>
            </div>
          </div>

          <Field 
            label="New Password" 
            placeholder="••••••••" 
            type="password" 
            hint="Min 8 characters"
          />
          
          <Field 
            label="Confirm New Password" 
            placeholder="••••••••" 
            type="password" 
          />

          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#f5a623] py-4 text-[15px] font-bold text-[#1b2b4b] shadow-[0_4px_20px_rgba(245,166,35,0.25)] transition-all hover:scale-[1.02] hover:shadow-[0_4px_25px_rgba(245,166,35,0.4)] active:scale-95">
            Update Password
          </button>
        </div>
      </div>
    </MobileShell>
  );
}