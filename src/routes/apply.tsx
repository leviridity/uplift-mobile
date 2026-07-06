import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Check, Calendar, MapPin } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { TopBar } from "@/components/mobile/TopBar";
import { subsidyPrograms } from "@/data/mock";

export const Route = createFileRoute("/apply")({
  component: ApplyPage,
});

function ApplyPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const apply = () => {
    if (!selected) return;
    setLoading(true);
    setTimeout(() => navigate({ to: "/subsidies" }), 900);
  };

  return (
    <MobileShell>
      <TopBar title="Apply for a subsidy" subtitle="Choose a program to apply for" />
      <div className="space-y-3 px-5 pt-4">
        {subsidyPrograms.map((p) => {
          const active = selected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`group block w-full rounded-3xl border-2 bg-white p-4 text-left shadow-card transition-all hover:-translate-y-1 hover:shadow-soft ${active ? "border-accent ring-4 ring-accent/20" : "border-transparent"}`}
            >
              <div className="flex items-start gap-3">
                <div className={`grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${p.color} text-white shadow-soft`}>
                  <p.icon className="h-7 w-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-extrabold text-primary">{p.name}</p>
                    {active && <div className="grid h-6 w-6 place-items-center rounded-full bg-gradient-accent text-primary shadow"><Check className="h-4 w-4" /></div>}
                  </div>
                  <p className="text-[11px] font-semibold text-accent">{p.agency}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 font-bold text-primary">
                      {p.amount}
                    </span>
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> Deadline {p.deadline}</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        <div className="sticky bottom-4 pt-3">
          <button
            onClick={apply}
            disabled={!selected || loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-accent py-4 text-sm font-bold text-primary shadow-glow transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Submitting application..." : selected ? "Apply now" : "Select a program"}
          </button>
          <Link to="/subsidies" className="mt-2 block text-center text-xs font-semibold text-muted-foreground hover:text-primary">
            View my subsidies
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}