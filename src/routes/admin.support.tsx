import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Plus } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { AdminBottomNav } from "@/components/mobile/AdminBottomNav";
import { TopBar } from "@/components/mobile/TopBar";
import { helpRequests } from "@/data/mock";

export const Route = createFileRoute("/admin/support")({
  component: AdminSupport,
});

function AdminSupport() {
  const [active, setActive] = useState(helpRequests[0].id);
  const [msg, setMsg] = useState("");
  const req = helpRequests.find((r) => r.id === active)!;

  return (
    <MobileShell bottomNav={<AdminBottomNav />}>
      <TopBar title="Help Requests" subtitle={`${helpRequests.length} conversations`} />
      <div className="grid grid-cols-1 gap-4 px-5 pt-4">
        <div className="space-y-2">
          {helpRequests.map((r) => {
            const cls = r.status === "OPEN" ? "bg-amber-100 text-amber-700" : r.status === "IN PROGRESS" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700";
            return (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                className={`flex w-full items-center gap-3 rounded-2xl border-2 bg-white p-3 text-left shadow-card transition-all hover:-translate-y-0.5 ${active === r.id ? "border-accent" : "border-transparent"}`}
              >
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-accent text-xs font-extrabold text-primary">{r.name.split(" ").map(n => n[0]).join("")}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-primary">{r.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{r.subject}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${cls}`}>{r.status}</span>
                  <span className="text-[10px] text-muted-foreground">{r.time}</span>
                </div>
              </button>
            );
          })}
        </div>

        <section className="rounded-3xl bg-white p-4 shadow-card">
          <p className="mb-2 text-sm font-extrabold text-primary">Reply to {req.name}</p>
          <div className="space-y-2 rounded-2xl bg-secondary p-3">
            <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white p-3 text-xs text-primary shadow">
              {req.subject}. Can you help me?
            </div>
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-accent p-3 text-xs font-semibold text-primary">
              Hi {req.name.split(" ")[0]}, we're looking into this now.
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-2xl border border-border p-2">
            <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a reply…" className="flex-1 bg-transparent px-2 text-sm outline-none" />
            <button onClick={() => setMsg("")} className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-accent text-primary shadow-soft transition-all hover:-translate-y-0.5 active:scale-95">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </section>
        <button className="fixed bottom-24 right-6 grid h-12 w-12 place-items-center rounded-full bg-gradient-accent text-primary shadow-glow transition-all hover:-translate-y-1 active:scale-95">
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </MobileShell>
  );
}