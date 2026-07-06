import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin, Clock, QrCode, Info, Bell, ChevronRight, Wallet } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { TopBar } from "@/components/mobile/TopBar";
import { subsidyPrograms } from "@/data/mock";

export const Route = createFileRoute("/subsidies/$id")({
  component: SubsidyDetail,
});

function SubsidyDetail() {
  const { id } = useParams({ from: "/subsidies/$id" });
  const [showQr, setShowQr] = useState(false);
  const program = subsidyPrograms.find((p) => p.id === id) ?? subsidyPrograms[0];

  return (
    <MobileShell>
      <TopBar title={program.name} subtitle={program.agency} />
      <div className="space-y-5 px-5 pt-4">
        <div className={`overflow-hidden rounded-3xl bg-gradient-to-br ${program.color} p-5 text-white shadow-glow`}>
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/20 backdrop-blur">
              <program.icon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/80">Benefit amount</p>
              <p className="text-2xl font-extrabold leading-tight">{program.amount}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/90">{program.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { Icon: Calendar, label: "Date", value: program.date },
            { Icon: Clock, label: "Time", value: program.time },
            { Icon: MapPin, label: "Venue", value: program.venue },
            { Icon: Bell, label: "Deadline", value: program.deadline },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="rounded-2xl bg-white p-3 shadow-card">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Icon className="h-3.5 w-3.5" />
                <span className="text-[10px] font-bold uppercase">{label}</span>
              </div>
              <p className="mt-1 text-xs font-bold text-primary">{value}</p>
            </div>
          ))}
        </div>

        <section className="rounded-3xl bg-white p-5 shadow-card">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Info className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-extrabold">Instructions from the agency</h3>
          </div>
          <ol className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <li className="flex gap-2"><span className="font-bold text-accent">1.</span> Bring a valid driver's license and OR/CR of your vehicle.</li>
            <li className="flex gap-2"><span className="font-bold text-accent">2.</span> Present the QR code below at the venue for verification.</li>
            <li className="flex gap-2"><span className="font-bold text-accent">3.</span> Wait for the SMS or push notification confirming disbursement.</li>
          </ol>
        </section>

        <button
          onClick={() => setShowQr((v) => !v)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 active:scale-95"
        >
          <QrCode className="h-5 w-5 text-accent" />
          {showQr ? "Hide QR code" : "Show QR code"}
        </button>
        {showQr && (
          <div className="flex flex-col items-center rounded-3xl bg-white p-6 shadow-glow">
            <div className="grid h-48 w-48 place-items-center rounded-2xl bg-gradient-to-br from-white to-secondary p-4 shadow-inner">
              <svg viewBox="0 0 100 100" className="h-full w-full text-primary">
                {Array.from({ length: 100 }).map((_, i) => {
                  const x = i % 10;
                  const y = Math.floor(i / 10);
                  const on = (x * y + x + y) % 3 === 0;
                  return on ? <rect key={i} x={x * 10} y={y * 10} width="9" height="9" fill="currentColor" rx="1" /> : null;
                })}
              </svg>
            </div>
            <p className="mt-3 text-xs font-bold text-primary">APP-2026-00018</p>
            <p className="text-[11px] text-muted-foreground">Present this QR at the venue</p>
          </div>
        )}

        <section>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-extrabold text-primary">
            <Wallet className="h-4 w-4 text-accent" /> Updates & announcements
          </h3>
          <div className="space-y-2">
            {[
              { time: "Yesterday", text: "Round 2 slots extended by 500 drivers." },
              { time: "3 days ago", text: "New verification requirements posted by LTFRB." },
              { time: "1 week ago", text: "Program officially launched by DOTr." },
            ].map((u, i) => (
              <Link key={i} to="/updates" className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card transition-all hover:-translate-y-0.5">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-accent"><Bell className="h-4 w-4" /></div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-primary">{u.text}</p>
                  <p className="text-[10px] text-muted-foreground">{u.time}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </MobileShell>
  );
}