import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import { TopBar } from "@/components/mobile/TopBar";
import { MobileShell } from "@/components/mobile/MobileShell";

export const Route = createFileRoute("/otp")({
  component: OtpPage,
});

function OtpPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(42);
  const [loading, setLoading] = useState(false);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const update = (i: number, v: string) => {
    const val = v.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const verify = () => {
    setLoading(true);
    setTimeout(() => navigate({ to: "/home" }), 900);
  };

  return (
    <MobileShell>
      <TopBar title="Verify your number" />
      <div className="px-6 pt-6">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-accent shadow-glow">
          <ShieldCheck className="h-10 w-10 text-primary" strokeWidth={2.4} />
        </div>
        <h2 className="mt-5 text-center text-xl font-extrabold text-primary">Enter the 6-digit code</h2>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Sent to <span className="font-semibold text-primary">+63 917 •••• 234</span>
        </p>

        <div className="mt-8 flex justify-between gap-2">
          {code.map((c, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={c}
              onChange={(e) => update(i, e.target.value)}
              inputMode="numeric"
              maxLength={1}
              className="h-14 w-full rounded-2xl border-2 border-border bg-white text-center text-2xl font-bold text-primary outline-none transition-all focus:border-accent focus:ring-4 focus:ring-accent/20"
            />
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-accent-soft p-3 text-center text-[11px] leading-relaxed text-primary">
          🔒 For your security, never share your verification code with anyone.
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Didn't get the code?{" "}
          {seconds > 0 ? (
            <span className="font-semibold text-primary">Resend in 0:{seconds.toString().padStart(2, "0")}</span>
          ) : (
            <button onClick={() => setSeconds(42)} className="font-semibold text-accent underline">Resend</button>
          )}
        </p>

        <button
          onClick={verify}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-accent py-4 text-sm font-bold text-primary shadow-glow transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-70"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Verifying..." : "Verify & Continue"}
        </button>
        <button
          onClick={() => navigate({ to: "/signup" })}
          className="mt-2 w-full rounded-2xl border-2 border-primary/10 bg-white py-3.5 text-sm font-bold text-primary transition-all hover:bg-secondary active:scale-95"
        >
          Back
        </button>
      </div>
    </MobileShell>
  );
}