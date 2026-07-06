import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { UserBottomNav } from "@/components/mobile/UserBottomNav";
import { TopBar } from "@/components/mobile/TopBar";
import { notifications } from "@/data/mock";

export const Route = createFileRoute("/updates")({
  component: UpdatesPage,
});

const tabs = ["All", "Applications", "Announcements", "Alerts"] as const;

function UpdatesPage() {
  const [tab, setTab] = useState<typeof tabs[number]>("All");
  return (
    <MobileShell bottomNav={<UserBottomNav />}>
      <TopBar title="Updates" subtitle={`${notifications.length} notifications`} right={<Bell className="h-5 w-5 text-accent" />} />
      <div className="px-5 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${tab === t ? "bg-gradient-accent text-primary shadow-glow" : "border border-border bg-white text-muted-foreground hover:text-primary"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {notifications.map((n) => (
            <button key={n.id} className="flex w-full items-start gap-3 rounded-2xl bg-white p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft">
              <div className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl ${n.type === "success" ? "bg-emerald-100 text-emerald-700" : n.type === "warning" ? "bg-amber-100 text-amber-700" : "bg-accent-soft text-accent"}`}>
                {n.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : n.type === "warning" ? <AlertTriangle className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold text-primary">{n.title}</p>
                  <span className="flex-shrink-0 text-[10px] text-muted-foreground">{n.time}</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}