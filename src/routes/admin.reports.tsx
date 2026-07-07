import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TrendingUp, BarChart3, PieChart, LayoutGrid, ArrowUpRight, ArrowDownRight, FileText } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { AdminBottomNav } from "@/components/mobile/AdminBottomNav";
import { TopBar } from "@/components/mobile/TopBar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/reports")({
  component: AdminReports,
});

const tabs = [
  { id: "Trend", icon: TrendingUp },
  { id: "Bar", icon: BarChart3 },
  { id: "Pie", icon: PieChart },
  { id: "Activity", icon: LayoutGrid }
] as const;

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const yLabels = [0, 20, 40, 60, 80, 100];

function AdminReports() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("Trend");
  const [timeframe, setTimeframe] = useState("Weekly");
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <MobileShell bottomNav={<AdminBottomNav />}>
      <TopBar title="Performance Reports" />
      
      <div className="px-6 pb-24 pt-4 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Total Apps", value: "2,842", change: "+14%", color: "bg-[#1b2b4b] text-white" },
            { label: "Pending", value: "312", change: "-2%", color: "bg-[#f5a623] text-[#1b2b4b]" },
            { label: "Verified", value: "2,105", change: "+8%", color: "bg-emerald-600 text-white" },
            { label: "Rejected", value: "425", change: "+4%", color: "bg-red-500 text-white" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-[24px] p-4 ${stat.color} shadow-lg transition-transform hover:scale-[1.02]`}>
              <p className="text-[9px] font-black opacity-70 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black mt-1">{stat.value}</p>
              <div className="flex items-center gap-1 mt-1 text-[9px] font-bold opacity-80">
                {stat.change.startsWith("+") ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[32px] bg-white p-6 border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-[10px] font-black text-[#1b2b4b] uppercase tracking-widest">Data Analysis</h3>
             <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="text-[10px] font-bold text-[#f5a623] bg-transparent outline-none">
                <option>Weekly</option>
                <option>Monthly</option>
             </select>
          </div>
          
          <div className="flex bg-gray-100 p-1 rounded-full border border-gray-200 mb-6 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 py-2 text-[9px] font-black uppercase tracking-wider rounded-full transition-all",
                  activeTab === tab.id ? "bg-white text-[#1b2b4b] shadow-sm" : "text-gray-500 hover:text-[#1b2b4b]"
                )}
              >
                <tab.icon size={12} /> {tab.id}
              </button>
            ))}
          </div>

          <div className="h-56 relative pt-4">
            {activeTab === "Trend" && (
                <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                    {yLabels.map(y => (
                        <g key={y}>
                            <line x1="25" y1={100 - y} x2="300" y2={100 - y} stroke="#f0f0f0" strokeWidth="1" />
                            <text x="5" y={105 - y} fontSize="8" fill="#8c8b88">{y}</text>
                        </g>
                    ))}
                    <path d="M25,80 Q100,10 170,50 T300,20" fill="none" stroke="#f5a623" strokeWidth="4" />
                    <path d="M25,80 L300,80 L300,100 L25,100 Z" fill="url(#grad)" opacity="0.1" />
                    <defs><linearGradient id="grad"><stop stopColor="#f5a623" /></linearGradient></defs>
                    {dayLabels.map((d, i) => (
                        <text key={d} x={25 + (i * 45)} y="115" fontSize="8" fill="#8c8b88" textAnchor="middle">{d}</text>
                    ))}
                </svg>
            )}
            {activeTab === "Bar" && (
                <div className="flex items-end justify-between h-full gap-2 px-6">
                    {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 group" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                            <span className={cn("text-[9px] font-black transition-opacity", hovered === i ? "opacity-100 text-[#f5a623]" : "opacity-0")}>
                                {[120, 250, 180, 310, 150, 200, 140][i]}
                            </span>
                            <div className="w-8 bg-[#1b2b4b] rounded-t-lg transition-all hover:bg-[#f5a623] cursor-pointer" style={{ height: `${h}%` }} />
                            <span className="text-[9px] font-bold text-gray-500">{dayLabels[i]}</span>
                        </div>
                    ))}
                </div>
            )}
            {activeTab === "Pie" && (
                <div className="flex items-center justify-center gap-6 h-full transition-all">
                    <div className="relative h-28 w-28 group cursor-pointer">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1b2b4b" strokeWidth="4" strokeDasharray="65 100" />
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f5a623" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-65" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center font-black text-[#1b2b4b] text-xs">84%</div>
                    </div>
                    <div className="space-y-1 text-[10px] font-bold text-[#1b2b4b]">
                        <p className="flex items-center gap-2 transition-transform hover:scale-110"><span className="h-2 w-2 rounded-full bg-[#1b2b4b]" /> Approved (65%)</p>
                        <p className="flex items-center gap-2 transition-transform hover:scale-110"><span className="h-2 w-2 rounded-full bg-[#f5a623]" /> Pending (25%)</p>
                        <p className="flex items-center gap-2 transition-transform hover:scale-110"><span className="h-2 w-2 rounded-full bg-[#10b981]" /> Rejected (10%)</p>
                    </div>
                </div>
            )}
            {activeTab === "Activity" && (
                <div className="grid grid-cols-7 gap-1">
                    {[...Array(28)].map((_, i) => (
                        <div key={i} className={cn("h-6 rounded-md transition-all hover:scale-110 cursor-pointer", i % 4 === 0 ? "bg-[#f5a623]" : i % 7 === 0 ? "bg-[#1b2b4b]" : "bg-gray-100")} />
                    ))}
                </div>
            )}
          </div>
        </div>

        <section>
          <h2 className="mb-4 text-[12px] font-black text-[#1b2b4b] uppercase tracking-wider ml-1">Recent Transactions</h2>
          <div className="space-y-3">
            {[
              { name: "Juan Santos", action: "Approved Subsidy", amt: "+₱ 6,500", date: "Today" },
              { name: "Maria Cruz", action: "Rejected App", amt: "-₱ 0.00", date: "Yesterday" },
              { name: "Pedro Dela Cruz", action: "Pending Review", amt: "₱ 0.00", date: "Yesterday" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm hover:border-[#1b2b4b] transition-all hover:shadow-md cursor-pointer group">
                <div className="h-10 w-10 rounded-2xl bg-gray-50 grid place-items-center group-hover:bg-[#1b2b4b] group-hover:text-white transition-colors"><FileText size={16} className="text-[#1b2b4b] group-hover:text-white" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-[#1b2b4b] truncate">{t.name}</p>
                  <p className="text-[10px] font-bold text-gray-400">{t.action}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-black text-[#1b2b4b]">{t.amt}</p>
                    <p className="text-[9px] font-bold text-gray-400">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MobileShell>
  );
}