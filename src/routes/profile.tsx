import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Pencil, IdCard, Fingerprint, Phone, KeyRound, Languages, Settings, LogOut, ChevronRight, Camera } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { UserBottomNav } from "@/components/mobile/UserBottomNav";
import { TopBar } from "@/components/mobile/TopBar";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

const rows = [
  { icon: Pencil, label: "Edit my information", to: null },
  { icon: IdCard, label: "Driver's license", to: null, badge: "Verified" },
  { icon: Fingerprint, label: "Link eGov PH", to: null },
  { icon: Phone, label: "Phone number", to: null, value: "+63 917 •••• 234" },
  { icon: KeyRound, label: "Password", to: null },
  { icon: Languages, label: "Language", value: "English" },
  { icon: Settings, label: "Settings" },
];

function ProfilePage() {
  const navigate = useNavigate();
  return (
    <MobileShell bottomNav={<UserBottomNav />}>
      <TopBar title="My Profile" />
      <div className="relative">
        <div className="h-32 bg-gradient-hero" />
        <div className="-mt-14 px-5">
          <div className="rounded-3xl bg-white p-5 shadow-glow">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-accent text-3xl font-extrabold text-primary shadow-soft">
                  JS
                </div>
                <button className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-primary text-white shadow-soft transition-all hover:scale-110 active:scale-95">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-extrabold text-primary">Juan Santos</p>
                <p className="text-xs text-muted-foreground">PUJ Driver · Metro Manila</p>
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" /> Verified Driver
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
              <div><p className="text-lg font-extrabold text-primary">3</p><p className="text-[10px] text-muted-foreground">Applications</p></div>
              <div><p className="text-lg font-extrabold text-primary">1</p><p className="text-[10px] text-muted-foreground">Approved</p></div>
              <div><p className="text-lg font-extrabold text-primary">₱6.5k</p><p className="text-[10px] text-muted-foreground">Received</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2 px-5">
        {rows.map((r) => (
          <button key={r.label} className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent"><r.icon className="h-5 w-5" /></div>
            <div className="flex-1">
              <p className="text-sm font-bold text-primary">{r.label}</p>
              {"value" in r && r.value && <p className="text-[11px] text-muted-foreground">{r.value}</p>}
            </div>
            {"badge" in r && r.badge && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{r.badge}</span>}
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