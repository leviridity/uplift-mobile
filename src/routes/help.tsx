import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, MessageSquare, Send, HelpCircle } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { TopBar } from "@/components/mobile/TopBar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/help")({
  component: HelpPage,
});

const faqs = [
  { q: "How do I apply for a subsidy?", a: "Go to Apply, choose a program, and follow the on-screen steps. Approval typically takes 24–48 hours." },
  { q: "How will I receive my funds?", a: "Approved subsidies are credited to your linked eGov PH wallet within 3 business days." },
  { q: "Can I file a grievance?", a: "Yes — head to My concerns to file a grievance. Our team responds within 24 hours." },
  { q: "How do I update my documents?", a: "Open Profile → Edit my information, then re-upload the required documents." },
];

function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [msg, setMsg] = useState("");
  return (
    <MobileShell>
      <TopBar title="Need help?" subtitle="FAQs and UPLIFT support" />
      <div className="space-y-5 px-5 pt-4">
        <div className="rounded-3xl bg-gradient-hero p-5 text-white shadow-glow">
          <HelpCircle className="h-8 w-8 text-accent" />
          <p className="mt-2 text-lg font-extrabold">We're here to help</p>
          <p className="text-xs text-white/80">Browse common questions or chat with a support agent.</p>
        </div>

        <section>
          <h2 className="mb-2 text-sm font-extrabold text-primary">Frequently asked</h2>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-card">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between p-4 text-left transition-all hover:bg-secondary"
                >
                  <span className="text-sm font-bold text-primary">{f.q}</span>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open === i && "rotate-180")} />
                </button>
                {open === i && <p className="px-4 pb-4 text-xs leading-relaxed text-muted-foreground">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-4 shadow-card">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-primary">
            <MessageSquare className="h-4 w-4 text-accent" /> Chat with admin
          </h2>
          <div className="space-y-2 rounded-2xl bg-secondary p-3">
            <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white p-3 text-xs text-primary shadow">
              Hi Juan! How can UPLIFT support help you today?
            </div>
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-accent p-3 text-xs font-semibold text-primary">
              I need help updating my driver's license.
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-2xl border border-border bg-white p-2">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 bg-transparent px-2 text-sm outline-none"
            />
            <button
              onClick={() => setMsg("")}
              className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-accent text-primary shadow-soft transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </MobileShell>
  );
}