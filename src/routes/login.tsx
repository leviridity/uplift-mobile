import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Fingerprint, Loader2, AlertTriangle } from "lucide-react";
import logo from "@/assets/uplift-logo.png";
import { TopBar } from "@/components/mobile/TopBar";
import { MobileShell } from "@/components/mobile/MobileShell";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setLoading(true);
    setTimeout(() => navigate({ to: "/otp" }), 700);
  };
  return (
    <MobileShell>
      <TopBar title="Welcome back" />
      <div className="px-6 pt-4">
        <div className="mx-auto flex h-24 w-24 items-center justify-center">
          <img src={logo} alt="UPLIFT" className="h-full w-full opacity-90 drop-shadow-[0_6px_20px_rgba(245,166,35,0.35)]" />
        </div>
        <h1 className="mt-2 text-center text-2xl font-extrabold text-primary">Kumusta, ka-driver!</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Sign in to continue managing your subsidies.</p>

        <label className="mt-8 block">
          <span className="mb-1.5 block text-xs font-semibold text-primary">Mobile number</span>
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/20">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-primary">+63</span>
            <input
              placeholder="917 123 4567"
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        </label>

        <button
          onClick={submit}
          disabled={loading}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-accent py-4 text-sm font-bold text-primary shadow-glow transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-70"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Sending code..." : "Send OTP & Continue"}
        </button>

        <div className="my-6 flex items-center gap-3 text-[11px] font-semibold text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> OR CONTINUE WITH <div className="h-px flex-1 bg-border" />
        </div>

        <button
          onClick={submit}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary/10 bg-white py-3.5 text-sm font-bold text-primary transition-all hover:border-primary/30 hover:bg-secondary active:scale-95"
        >
          <Fingerprint className="h-5 w-5 text-accent" />
          Continue with eGov PH
        </button>

        <div className="mt-6 flex justify-between text-xs font-semibold">
          <button className="text-primary underline underline-offset-2 hover:text-accent">Forgot password?</button>
          <button className="text-primary underline underline-offset-2 hover:text-accent">Change number</button>
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-2xl border border-yellow-300/60 bg-accent-soft p-3 text-[11px] leading-relaxed text-primary">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
          UPLIFT will never ask for your password or OTP over calls or SMS.
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          No account yet?{" "}
          <Link to="/signup" className="font-bold text-primary underline underline-offset-2 hover:text-accent">
            Sign up
          </Link>
        </p>
      </div>
    </MobileShell>
  );
}