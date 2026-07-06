import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, KeyRound, Settings, LogOut, Bell, ChevronRight } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { AdminBottomNav } from "@/components/mobile/AdminBottomNav";
import { TopBar } from "@/components/mobile/TopBar";

export const Route = createFileRoute("/admin/profile")({
  component: AdminProfile,
});

function AdminProfile() {
  const navigate = useNavigate();
  return (
    <MobileShell bottomNav={<AdminBottomNav />}>
      <TopBar title="Admin Profile" />
      <div className="h-24 bg-gradient-hero" />
      <div className="-mt-12 px-5">
        <div className="rounded-3xl bg-white p-5 shadow-glow">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-accent text-3xl font-extrabold text-primary shadow-soft">AR</div>
            <div>
              <p className="text-lg font-extrabold text-primary">Admin Reyes</p>
              <p className="text-xs text-muted-foreground">DOTr Administrator</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700"><CheckCircle2 className="h-3 w-3" /> Verified</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 space-y-2 px-5">
        {[
          { Icon: ShieldCheck, label: "Roles & permissions" },
          { Icon: KeyRound, label: "Change password" },
          { Icon: Bell, label: "Notifications" },
          { Icon: Settings, label: "Settings" },
        ].map((r) => (
          <button key={r.label} className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-card transition-all hover:-translate-y-0.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent"><r.Icon className="h-5 w-5" /></div>
            <p className="flex-1 text-sm font-bold text-primary">{r.label}</p>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
        <button
          onClick={() => navigate({ to: "/" })}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-red-200 bg-red-50 py-3.5 text-sm font-bold text-red-600 transition-all hover:bg-red-100 active:scale-95"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </MobileShell>
  );
}