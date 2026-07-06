import { createFileRoute, useParams, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, FileText, Image as ImageIcon, IdCard, Files, RotateCcw, X, Loader2 } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { TopBar } from "@/components/mobile/TopBar";
import { adminApplicants } from "@/data/mock";

export const Route = createFileRoute("/admin/applications/$id")({
  component: AdminApplicationDetail,
});

const docs = [
  { name: "Driver's License", Icon: IdCard },
  { name: "Selfie with License", Icon: ImageIcon },
  { name: "eGov PH Document", Icon: FileText },
  { name: "Others (2)", Icon: Files },
];

const reasons = ["Incomplete documents", "Blurry or unclear document", "Expired driver's license", "Name does not match", "Invalid eGov document", "Selfie not clear", "Other reason"];

function AdminApplicationDetail() {
  const { id } = useParams({ from: "/admin/applications/$id" });
  const navigate = useNavigate();
  const applicant = adminApplicants.find((a) => a.id === id) ?? adminApplicants[0];
  const [rejectOpen, setRejectOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState<null | "approve" | "reject" | "revision">(null);

  const act = (kind: "approve" | "reject" | "revision") => {
    setLoading(kind);
    setTimeout(() => navigate({ to: "/admin/applications" }), 800);
  };

  return (
    <MobileShell>
      <TopBar title="Application Details" subtitle={applicant.id} />
      <div className="space-y-4 px-5 pt-4">
        <div className="rounded-3xl bg-white p-4 shadow-card">
          <div className="flex items-start gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-accent text-sm font-extrabold text-primary shadow-soft">
              {applicant.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base font-extrabold text-primary">{applicant.name}</p>
              <p className="text-xs text-muted-foreground">{applicant.role} · {applicant.city}</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">PENDING</span>
            </div>
          </div>
        </div>

        <section>
          <h3 className="mb-2 text-sm font-extrabold text-primary">Requirements</h3>
          <div className="space-y-2">
            {docs.map((d) => (
              <div key={d.name} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent"><d.Icon className="h-5 w-5" /></div>
                <p className="flex-1 text-sm font-bold text-primary">{d.name}</p>
                <button className="text-xs font-bold text-accent hover:underline">View</button>
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-4 shadow-card">
          <h3 className="text-sm font-extrabold text-primary">Application Info</h3>
          <dl className="mt-2 space-y-2 text-xs">
            {[
              ["Submitted", "May 26, 2027 · 10:24 AM"],
              ["Application ID", applicant.id],
              ["Program", "PUV Fuel Subsidy 2026"],
              ["Contact Number", "+63 917 123 4567"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-border/50 pb-2 last:border-0">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-bold text-primary">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="sticky bottom-4 grid grid-cols-3 gap-2">
          <button
            onClick={() => act("revision")}
            disabled={!!loading}
            className="flex items-center justify-center gap-1 rounded-2xl border-2 border-accent bg-accent-soft py-3 text-xs font-bold text-primary transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-60"
          >
            {loading === "revision" ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
            Revision
          </button>
          <button
            onClick={() => setRejectOpen(true)}
            disabled={!!loading}
            className="rounded-2xl border-2 border-red-200 bg-white py-3 text-xs font-bold text-red-600 transition-all hover:bg-red-50 active:scale-95"
          >
            Reject
          </button>
          <button
            onClick={() => act("approve")}
            disabled={!!loading}
            className="flex items-center justify-center gap-1 rounded-2xl bg-primary py-3 text-xs font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-60"
          >
            {loading === "approve" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
            Approve
          </button>
        </div>

        {rejectOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm" onClick={() => setRejectOpen(false)}>
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[440px] rounded-t-3xl bg-white p-5 shadow-glow">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-extrabold text-primary">Reject Application</h3>
                <button onClick={() => setRejectOpen(false)} className="grid h-8 w-8 place-items-center rounded-full bg-secondary"><X className="h-4 w-4" /></button>
              </div>
              <p className="text-xs text-muted-foreground">Select one or more reasons</p>
              <div className="mt-3 space-y-2">
                {reasons.map((r) => {
                  const on = selected.includes(r);
                  return (
                    <button
                      key={r}
                      onClick={() => setSelected(on ? selected.filter((x) => x !== r) : [...selected, r])}
                      className={`flex w-full items-center gap-3 rounded-2xl border-2 px-3 py-2.5 text-left text-xs font-semibold transition-all ${on ? "border-accent bg-accent-soft text-primary" : "border-border bg-white text-muted-foreground"}`}
                    >
                      <span className={`grid h-5 w-5 place-items-center rounded-md border-2 ${on ? "border-accent bg-accent text-primary" : "border-border"}`}>
                        {on && <CheckCircle2 className="h-3 w-3" />}
                      </span>
                      {r}
                    </button>
                  );
                })}
              </div>
              <textarea rows={3} placeholder="Additional notes (optional)" className="mt-3 w-full rounded-2xl border border-border px-3 py-2 text-sm outline-none focus:border-accent focus:ring-4 focus:ring-accent/20" />
              <button
                onClick={() => { setRejectOpen(false); act("reject"); }}
                className="mt-3 w-full rounded-2xl bg-red-600 py-3.5 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 active:scale-95"
              >
                Reject Application
              </button>
            </div>
          </div>
        )}
      </div>
    </MobileShell>
  );
}