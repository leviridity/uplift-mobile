import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Filter, CheckCircle2, XCircle, Clock, ChevronRight } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { AdminBottomNav } from "@/components/mobile/AdminBottomNav";
import { TopBar } from "@/components/mobile/TopBar";
import { adminApplicants } from "@/data/mock";

export const Route = createFileRoute("/admin/applications")({
  component: AdminApplications,
});

const tabs = ["All", "Pending", "Approved", "Rejected"] as const;

function AdminApplications() {
  const [tab, setTab] = useState<typeof tabs[number]>("All");
  const [q, setQ] = useState("");
  const filtered = adminApplicants.filter((a) => {
    if (tab !== "All" && a.status !== tab.toLowerCase()) return false;
    if (q && !(`${a.name} ${a.id}`).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });
  return (
    <MobileShell bottomNav={<AdminBottomNav />}>
      <TopBar title="Applications" subtitle={`${filtered.length} results`} right={<Filter className="h-5 w-5 text-accent" />} />
      <div className="space-y-4 px-5 pt-4">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-white px-3 py-2 shadow-card focus-within:border-accent">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search applications…" className="flex-1 bg-transparent text-sm outline-none" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${tab === t ? "bg-gradient-accent text-primary shadow-glow" : "border border-border bg-white text-muted-foreground"}`}
            >
              {t}
              <span className={`rounded-full px-1.5 text-[10px] ${tab === t ? "bg-primary/10 text-primary" : "bg-secondary text-primary"}`}>
                {t === "All" ? adminApplicants.length : adminApplicants.filter((a) => a.status === t.toLowerCase()).length}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((a) => {
            const badge = a.status === "pending" ? { cls: "bg-amber-100 text-amber-700", Icon: Clock, label: "PENDING" } : a.status === "approved" ? { cls: "bg-emerald-100 text-emerald-700", Icon: CheckCircle2, label: "APPROVED" } : { cls: "bg-red-100 text-red-600", Icon: XCircle, label: "REJECTED" };
            return (
              <div key={a.id} className="rounded-3xl bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft">
                <Link to="/admin/applications/$id" params={{ id: a.id }} className="flex items-start gap-3">
                  <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-gradient-accent text-sm font-extrabold text-primary shadow-soft">
                    {a.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-extrabold text-primary">{a.name}</p>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${badge.cls}`}>
                        <badge.Icon className="h-3 w-3" /> {badge.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{a.role} · {a.city}</p>
                    <p className="text-[11px] text-muted-foreground">Submitted {a.submitted}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {["License", "Selfie", "eGov", "Others"].map((d) => (
                        <span key={d} className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" /> {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                </Link>
                {a.status === "pending" && (
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 rounded-xl border-2 border-red-200 py-2 text-xs font-bold text-red-600 transition-all hover:bg-red-50 active:scale-95">Reject</button>
                    <button className="flex-1 rounded-xl bg-primary py-2 text-xs font-bold text-white transition-all hover:-translate-y-0.5 active:scale-95">Approve</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </MobileShell>
  );
}