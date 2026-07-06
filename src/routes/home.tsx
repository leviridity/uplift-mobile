import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Cloud, Sun, Calendar, CheckCircle2, FileText, ShieldCheck, Fuel, IdCard, HelpCircle, AlertTriangle, ChevronRight, Sparkles, Star } from "lucide-react";
import logo from "@/assets/uplift-logo.png";
import { MobileShell } from "@/components/mobile/MobileShell";
import { UserBottomNav } from "@/components/mobile/UserBottomNav";
import { notifications, myApplications } from "@/data/mock";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

function HomePage() {
  const pending = myApplications.filter((a) => a.status === "pending").length;
  const approved = myApplications.filter((a) => a.status === "approved").length;
  const active = myApplications.length;
  return (
    <MobileShell bottomNav={<UserBottomNav />}>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-hero px-5 pb-24 pt-8 text-white">
        <div className="absolute -right-16 -top-10 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent-glow/20 blur-3xl" />
        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/95 shadow-glow">
              <img src={logo} alt="UPLIFT" className="h-9 w-9" />
            </div>
            <div>
              <p className="text-xs text-white/80">Good morning,</p>
              <p className="text-lg font-extrabold leading-tight">Juan Santos <Sparkles className="ml-1 inline h-4 w-4 text-accent" /></p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 ring-1 ring-emerald-400/40">
                <CheckCircle2 className="h-3 w-3" /> Verified Driver
              </span>
            </div>
          </div>
          <Link to="/updates" className="relative grid h-11 w-11 place-items-center rounded-full bg-white/10 backdrop-blur transition-all hover:bg-white/20 active:scale-95">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-primary shadow">
              {notifications.length}
            </span>
          </Link>
        </div>

        <div className="relative mt-6 flex items-center gap-6 text-white/90">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
              <Cloud className="h-4 w-4 text-accent" />
              <Sun className="-ml-2 -mt-2 h-3 w-3 text-accent-glow" />
            </div>
            <div>
              <p className="text-sm font-bold">27°C</p>
              <p className="text-[10px] text-white/70">Partly cloudy</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
              <Calendar className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-bold">May 26, 2027</p>
              <p className="text-[10px] text-white/70">Monday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest updates */}
      <div className="-mt-16 space-y-5 px-5">
        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-primary">Latest updates</h2>
            <Link to="/updates" className="text-xs font-bold text-accent hover:underline">See all</Link>
          </div>
          <div className="space-y-2">
            {notifications.slice(0, 2).map((n) => (
              <Link to="/updates" key={n.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft">
                <div className={`grid h-11 w-11 place-items-center rounded-xl ${n.type === "success" ? "bg-emerald-100 text-emerald-700" : n.type === "warning" ? "bg-amber-100 text-amber-700" : "bg-accent/20 text-accent-foreground"}`}>
                  {n.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : n.type === "warning" ? <AlertTriangle className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-primary">{n.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{n.body}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Apply */}
        <Link to="/apply" className="group relative flex items-center gap-4 overflow-hidden rounded-3xl bg-gradient-accent p-4 shadow-glow transition-all hover:-translate-y-1">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
          <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-soft">
            <Fuel className="h-8 w-8 text-accent" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-primary shadow">
              <Star className="h-3 w-3 fill-accent text-accent" /> HIGH PRIORITY
            </span>
            <p className="mt-1 text-base font-extrabold text-primary">Apply for PUV Subsidy</p>
            <p className="text-[11px] font-semibold text-primary/70">Round 2 · Deadline Dec 15</p>
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-primary shadow transition-transform group-hover:translate-x-1">
            <ChevronRight className="h-5 w-5" />
          </div>
        </Link>

        {/* Quick actions */}
        <section>
          <h2 className="mb-2 text-base font-extrabold text-primary">Quick actions</h2>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: ShieldCheck, label: "Verify", desc: "Docs", to: "/profile", color: "bg-accent-soft text-accent" },
              { icon: FileText, label: "Track", desc: "Subsidy", to: "/subsidies", color: "bg-blue-50 text-blue-700" },
              { icon: Fuel, label: "Gas", desc: "Prices", to: "/gas", color: "bg-orange-50 text-orange-700" },
              { icon: IdCard, label: "e-Gov", desc: "PH", to: "/profile", color: "bg-sky-50 text-sky-700" },
            ].map(({ icon: Icon, label, desc, to, color }) => (
              <Link key={label} to={to} className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-3 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-soft active:scale-95">
                <div className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-bold text-primary">{label}</span>
                <span className="text-[10px] text-muted-foreground">{desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* My Subsidies */}
        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-primary">My Subsidies</h2>
            <Link to="/subsidies" className="text-xs font-bold text-accent hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-3xl bg-white p-4 shadow-card">
            {[
              { label: "Active", value: active, color: "bg-blue-50 text-blue-700", Icon: FileText },
              { label: "Approved", value: approved, color: "bg-emerald-50 text-emerald-700", Icon: CheckCircle2 },
              { label: "Pending", value: pending, color: "bg-amber-50 text-amber-700", Icon: AlertTriangle },
            ].map(({ label, value, color, Icon }) => (
              <div key={label} className="flex flex-col items-center rounded-2xl p-2 text-center">
                <div className={`grid h-10 w-10 place-items-center rounded-full ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-1 text-2xl font-extrabold text-primary">{value}</p>
                <p className="text-[10px] font-semibold text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Help + Concerns */}
        <div className="space-y-2">
          <Link to="/help" className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent"><HelpCircle className="h-5 w-5" /></div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-primary">Need help?</p>
              <p className="text-xs text-muted-foreground">Guides, FAQs, and UPLIFT support</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
          <Link to="/concerns" className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-red-600"><AlertTriangle className="h-5 w-5" /></div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-primary">My concerns</p>
              <p className="text-xs text-muted-foreground">Grievances & profile issues</p>
            </div>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-red-100 text-[11px] font-bold text-red-600">2</span>
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}