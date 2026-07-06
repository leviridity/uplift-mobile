import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ChevronRight, FileStack, ShieldCheck, HelpCircle, PlusCircle, CheckCircle2 } from "lucide-react";
import logo from "@/assets/uplift-logo.png";
import { MobileShell } from "@/components/mobile/MobileShell";
import { AdminBottomNav } from "@/components/mobile/AdminBottomNav";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function AdminHome() {
  return (
    <MobileShell bottomNav={<AdminBottomNav />}>
      <div className="relative overflow-hidden bg-gradient-hero px-5 pb-20 pt-8 text-white">
        <div className="absolute -right-16 -top-10 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />
        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/95 shadow-glow">
              <img src={logo} alt="UPLIFT" className="h-9 w-9" />
            </div>
            <div>
              <p className="text-xs text-white/80">Good morning,</p>
              <p className="text-lg font-extrabold leading-tight">Admin Reyes</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent ring-1 ring-accent/40">
                <CheckCircle2 className="h-3 w-3" /> DOTr Administrator
              </span>
            </div>
          </div>
          <button className="relative grid h-11 w-11 place-items-center rounded-full bg-white/10 backdrop-blur transition-all hover:bg-white/20">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-primary">3</span>
          </button>
        </div>
      </div>

      <div className="-mt-14 space-y-5 px-5">
        <div className="rounded-3xl bg-white p-4 shadow-glow">
          <p className="text-sm font-extrabold text-primary">Today's Overview</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: "Pending", value: 18, color: "bg-amber-100 text-amber-700", Icon: FileStack },
              { label: "Verified", value: 9, color: "bg-emerald-100 text-emerald-700", Icon: ShieldCheck },
              { label: "Help Requests", value: 5, color: "bg-red-100 text-red-600", Icon: HelpCircle },
            ].map(({ label, value, color, Icon }) => (
              <div key={label} className="flex flex-col items-center rounded-2xl bg-secondary p-3 text-center">
                <div className={`grid h-10 w-10 place-items-center rounded-full ${color}`}><Icon className="h-5 w-5" /></div>
                <p className="mt-1 text-2xl font-extrabold text-primary">{value}</p>
                <p className="text-[10px] font-semibold text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-primary">Quick Actions</h2>
            <Link to="/admin/applications" className="text-xs font-bold text-accent hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { Icon: PlusCircle, label: "Create Event", desc: "Add new event", to: "/admin/applications" as const, color: "bg-sky-50 text-sky-700" },
              { Icon: ShieldCheck, label: "Verify Driver", desc: "Review docs", to: "/admin/applications" as const, color: "bg-accent-soft text-accent" },
              { Icon: FileStack, label: "Applications", desc: "Review queue", to: "/admin/applications" as const, color: "bg-violet-50 text-violet-700" },
            ].map((q) => (
              <Link key={q.label} to={q.to} className="rounded-2xl bg-white p-3 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-soft active:scale-95">
                <div className={`mx-auto grid h-10 w-10 place-items-center rounded-xl ${q.color}`}><q.Icon className="h-5 w-5" /></div>
                <p className="mt-1 text-[11px] font-bold text-primary">{q.label}</p>
                <p className="text-[10px] text-muted-foreground">{q.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-extrabold text-primary">Recent Activity</h2>
          <div className="space-y-2">
            {[
              { name: "Juan Santos", desc: "New application submitted", time: "2m ago" },
              { name: "Maria Cruz", desc: "Verification approved", time: "15m ago" },
              { name: "Pedro Dela Cruz", desc: "Requested revision", time: "1h ago" },
            ].map((a) => (
              <Link key={a.name} to="/admin/applications" className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card transition-all hover:-translate-y-0.5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-accent text-xs font-extrabold text-primary">{a.name.split(" ").map(n => n[0]).join("")}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-primary">{a.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.desc}</p>
                </div>
                <span className="text-[10px] text-muted-foreground">{a.time}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </MobileShell>
  );
}