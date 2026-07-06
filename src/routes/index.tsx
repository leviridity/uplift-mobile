import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Fuel, FileText, ShieldCheck, Sparkles } from "lucide-react";
import logo from "@/assets/uplift-logo.png";
import { MobileShell } from "@/components/mobile/MobileShell";
import { partners } from "@/data/mock";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  { icon: FileText, label: "Apply", desc: "Direct subsidy applications" },
  { icon: ShieldCheck, label: "Subsidies", desc: "Track & manage benefits" },
  { icon: Fuel, label: "Gas Prices", desc: "Live prices near you" },
];

function Landing() {
  return (
    <MobileShell className="pb-6">
      <div className="relative overflow-hidden bg-gradient-hero px-6 pb-16 pt-14 text-white">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent-glow/20 blur-3xl" />
        <div className="relative flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={logo}
              alt="UPLIFT"
              className="h-40 w-40 opacity-90 drop-shadow-[0_10px_40px_rgba(245,166,35,0.5)]"
            />
            <Sparkles className="absolute -right-2 top-2 h-6 w-6 animate-pulse text-accent" />
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">UPLIFT</h1>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            For every Filipino driver
          </p>
          <p className="mt-6 text-balance text-lg font-semibold leading-snug">
            Fast-Track Your Benefits
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">
            Secure verification and direct subsidy applications, right from your phone.
          </p>
        </div>
      </div>

      <div className="-mt-10 px-5">
        <div className="grid grid-cols-3 gap-3 rounded-3xl bg-white p-4 shadow-glow">
          {features.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 rounded-2xl bg-accent-soft/50 p-3 text-center transition-all hover:-translate-y-1 hover:shadow-soft">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-accent text-primary shadow-soft">
                <Icon className="h-5 w-5" strokeWidth={2.4} />
              </div>
              <span className="text-xs font-bold text-primary">{label}</span>
              <span className="text-[10px] leading-tight text-muted-foreground">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 px-6">
        <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          In partnership with
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {partners.map((p) => (
            <div
              key={p.name}
              title={p.full}
              className="rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-bold text-primary shadow-card"
            >
              {p.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 px-6">
        <Link
          to="/signup"
          className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-accent px-6 py-4 text-sm font-bold text-primary shadow-glow transition-all hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Create an account
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to="/login"
          className="flex items-center justify-center rounded-2xl border-2 border-primary/10 bg-white px-6 py-4 text-sm font-bold text-primary transition-all hover:border-primary/30 hover:bg-secondary active:scale-[0.98]"
        >
          I already have an account
        </Link>
        <Link
          to="/admin"
          className="mt-1 flex items-center justify-center rounded-xl border border-dashed border-muted-foreground/40 bg-transparent px-6 py-2.5 text-xs font-medium text-muted-foreground transition-all hover:bg-secondary"
        >
          Admin login (demo)
        </Link>
        <p className="mt-2 px-4 text-center text-[11px] leading-relaxed text-muted-foreground">
          By continuing, you agree to our{" "}
          <span className="font-semibold text-primary underline underline-offset-2">Terms</span> &{" "}
          <span className="font-semibold text-primary underline underline-offset-2">Privacy</span>.
        </p>
      </div>
    </MobileShell>
  );
}
