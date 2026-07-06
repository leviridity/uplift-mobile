import { createFileRoute } from "@tanstack/react-router";
import { Fuel, MapPin, ArrowDown, ArrowUp, Minus, Info, ChevronRight } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { UserBottomNav } from "@/components/mobile/UserBottomNav";
import { TopBar } from "@/components/mobile/TopBar";
import { gasStations } from "@/data/mock";

export const Route = createFileRoute("/gas")({
  component: GasPage,
});

const prices = [
  { label: "Diesel", value: "₱58.20", change: "-₱0.50/L", dir: "down" as const },
  { label: "Gasoline (91)", value: "₱62.85", change: "+₱0.30/L", dir: "up" as const },
  { label: "Gasoline (95)", value: "₱65.40", change: "+₱0.20/L", dir: "up" as const },
  { label: "Gasoline (97)", value: "₱68.10", change: "No change", dir: "flat" as const },
];

function GasPage() {
  return (
    <MobileShell bottomNav={<UserBottomNav />}>
      <TopBar title="Gas Prices" subtitle="Live from DOE Oil Monitor" />
      <div className="space-y-5 px-5 pt-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-5 text-white shadow-glow">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-accent text-primary shadow-soft">
              <Fuel className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-[11px] text-white/80"><MapPin className="h-3 w-3" /> Metro Manila · Updated 2h ago</div>
              <p className="text-lg font-extrabold">Today's average</p>
            </div>
          </div>
          <div className="relative mt-4 grid grid-cols-2 gap-2">
            {prices.map((p) => (
              <div key={p.label} className="rounded-2xl bg-white/10 p-3 backdrop-blur">
                <p className="text-[11px] font-semibold text-white/80">{p.label}</p>
                <p className="mt-1 text-lg font-extrabold">{p.value}</p>
                <div className={`mt-1 inline-flex items-center gap-1 text-[10px] font-bold ${p.dir === "up" ? "text-red-300" : p.dir === "down" ? "text-emerald-300" : "text-white/70"}`}>
                  {p.dir === "up" ? <ArrowUp className="h-3 w-3" /> : p.dir === "down" ? <ArrowDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                  {p.change}
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-3 flex items-center gap-1 rounded-xl bg-white/10 p-2 text-[10px] text-white/80">
            <Info className="h-3 w-3 text-accent" /> Prices sourced from DOE Oil Monitor. For reference only.
          </div>
        </div>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-primary">Cheapest near you</h2>
              <p className="text-[11px] text-muted-foreground">Based on Diesel price</p>
            </div>
            <button className="text-xs font-bold text-accent hover:underline">View all</button>
          </div>
          <div className="space-y-2">
            {gasStations.map((s) => (
              <button key={s.name} className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft active:scale-[0.99]">
                <div className={`grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl text-xs font-extrabold ${s.color}`}>
                  {s.brand.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold text-primary">{s.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{s.km} · {s.area}</p>
                  <span className="mt-1 inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">Diesel</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-primary">{s.price}</p>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </MobileShell>
  );
}