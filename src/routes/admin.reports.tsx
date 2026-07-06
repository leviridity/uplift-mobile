import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { AdminBottomNav } from "@/components/mobile/AdminBottomNav";
import { TopBar } from "@/components/mobile/TopBar";

export const Route = createFileRoute("/admin/reports")({
  component: AdminReports,
});

const bars = [12, 16, 14, 18, 20, 17, 18];
const days = [20, 21, 22, 23, 24, 25, 26];

function AdminReports() {
  const max = Math.max(...bars);
  return (
    <MobileShell bottomNav={<AdminBottomNav />}>
      <TopBar title="Reports" subtitle="Insights & statistics" right={<Calendar className="h-5 w-5 text-accent" />} />
      <div className="space-y-4 px-5 pt-4">
        <div className="rounded-3xl bg-white p-4 shadow-card">
          <p className="text-xs font-bold text-muted-foreground">Overview (Today)</p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            {[
              { v: 18, l: "Applications" },
              { v: 9, l: "Approved" },
              { v: 4, l: "Rejected" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-secondary p-3">
                <p className="text-2xl font-extrabold text-primary">{s.v}</p>
                <p className="text-[10px] font-semibold text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-card">
          <p className="text-xs font-bold text-muted-foreground">Applications Trend · Last 7 days</p>
          <div className="mt-4 flex h-40 items-end justify-between gap-2">
            {bars.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-primary">{v}</span>
                <div
                  className="w-full rounded-t-xl bg-gradient-accent shadow-soft transition-all hover:opacity-90"
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-card">
          <p className="text-xs font-bold text-muted-foreground">Status distribution</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-28 w-28">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="oklch(0.92 0.01 250)" strokeWidth="4" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="oklch(0.65 0.15 155)" strokeWidth="4" strokeDasharray="48 100" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="oklch(0.79 0.16 70)" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-48" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="oklch(0.62 0.22 25)" strokeWidth="4" strokeDasharray="10 100" strokeDashoffset="-78" />
              </svg>
            </div>
            <ul className="flex-1 space-y-1 text-xs">
              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Approved</span><span className="font-bold text-primary">48 (60%)</span></li>
              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent" /> Pending</span><span className="font-bold text-primary">24 (30%)</span></li>
              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-500" /> Rejected</span><span className="font-bold text-primary">8 (10%)</span></li>
            </ul>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}