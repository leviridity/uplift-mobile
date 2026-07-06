import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, HelpCircle, Info, CheckCircle2, Clock, XCircle, RotateCcw, AlertTriangle, ChevronRight } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { UserBottomNav } from "@/components/mobile/UserBottomNav";
import { TopBar } from "@/components/mobile/TopBar";
import { myApplications, subsidyPrograms } from "@/data/mock";

export const Route = createFileRoute("/subsidies")({
  component: SubsidiesPage,
});

const statusMeta = {
  approved: { label: "APPROVED", cls: "bg-emerald-100 text-emerald-700", Icon: CheckCircle2 },
  pending: { label: "PENDING", cls: "bg-amber-100 text-amber-700", Icon: Clock },
  rejected: { label: "REJECTED", cls: "bg-red-100 text-red-700", Icon: XCircle },
  revision: { label: "REVISION", cls: "bg-blue-100 text-blue-700", Icon: RotateCcw },
} as const;

function SubsidiesPage() {
  return (
    <MobileShell bottomNav={<UserBottomNav />}>
      <TopBar title="My Subsidies" subtitle={`${myApplications.length} active applications`} />
      <div className="space-y-5 px-5 pt-4">
        <div className="rounded-3xl bg-gradient-hero p-5 text-white shadow-glow">
          <div className="flex items-center gap-2 text-accent">
            <Info className="h-4 w-4" />
            <span className="text-[11px] font-bold uppercase tracking-widest">How it works</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/90">
            Apply once, upload your requirements, and track every step in real-time. Approved subsidies are released via your linked eGov PH wallet.
          </p>
        </div>

        <div className="space-y-3">
          {myApplications.map((app) => {
            const program = subsidyPrograms.find((p) => p.id === app.programId)!;
            const s = statusMeta[app.status];
            return (
              <Link
                key={app.id}
                to="/subsidies/$id"
                params={{ id: app.programId }}
                className="group block rounded-3xl bg-white p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="flex items-start gap-3">
                  <div className={`grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${program.color} text-white shadow-soft`}>
                    <program.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-extrabold text-primary">{program.name}</p>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{app.id} · {program.agency}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${s.cls}`}>
                        <s.Icon className="h-3 w-3" /> {s.label}
                      </span>
                      {app.hasGrievance && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">
                          <AlertTriangle className="h-3 w-3" /> Grievance filed
                        </span>
                      )}
                    </div>
                    <p className="mt-2 rounded-xl bg-secondary p-2 text-[11px] leading-relaxed text-muted-foreground">
                      {app.note}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex gap-2">
          <Link to="/help" className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-primary/10 bg-white py-3 text-sm font-bold text-primary transition-all hover:bg-secondary active:scale-95">
            <HelpCircle className="h-4 w-4" /> Need help?
          </Link>
          <Link to="/apply" className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-accent py-3 text-sm font-bold text-primary shadow-glow transition-all hover:-translate-y-0.5 active:scale-95">
            <Plus className="h-4 w-4" /> New application
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}