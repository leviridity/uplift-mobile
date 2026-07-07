import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Upload, FileText, CheckCircle2 } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { TopBar } from "@/components/mobile/TopBar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/apply-detail")({
  component: ApplyDetail,
});

function ApplyDetail() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [checked, setChecked] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "Juan Dela Cruz Santos",
    license: "N01-••-••••",
    driverType: "Tricycle",
    region: "NCR",
    gender: "Male",
    address: "123 Mabini St, Manila",
    plate: "",
    vehicle: "",
    year: "",
    route: ""
  });

  const toggleUpload = (doc: string) => {
    setUploadedDocs(prev => prev.includes(doc) ? prev.filter(i => i !== doc) : [...prev, doc]);
  };

  const next = () => {
    if (step < 4) setStep(step + 1);
    else navigate({ to: "/subsidies" });
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
    else navigate({ to: "/apply" });
  };

  return (
    <MobileShell>
      <TopBar title="Apply for Subsidy" />
      
      <div className="px-6 pt-4 pb-28">
        <div className="flex gap-1.5 mb-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={cn("h-1.5 flex-1 rounded-full transition-colors", n <= step ? "bg-[#f5a623]" : "bg-gray-100")} />
          ))}
        </div>

        <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#8c8b88]">Step {step} of 4</p>
        <h2 className="text-xl font-black text-[#1b2b4b] mt-1 mb-6">
          {step === 1 && "Driver information"}
          {step === 2 && "Vehicle & route"}
          {step === 3 && "Supporting documents"}
          {step === 4 && "Review & submit"}
        </h2>

        {step === 1 && (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-[#1b2b4b] to-[#2a3f68] backdrop-blur-md rounded-[24px] flex items-center gap-3 shadow-lg shadow-[#1b2b4b]/20">
              <div className="w-10 h-10 rounded-full bg-white/10 text-[#f5a623] grid place-items-center shrink-0 border border-white/10"><Check size={20} /></div>
              <p className="text-[12px] font-bold text-white">Verified profile — details auto-filled.</p>
            </div>
            
            {[
                { label: "Full name", val: formData.name, key: "name" },
                { label: "License number", val: formData.license, key: "license" },
            ].map(f => (
                <div key={f.label} className="space-y-1.5">
                    <label className="text-[12px] font-bold text-[#1b2b4b]">{f.label}</label>
                    <input className="w-full rounded-2xl border-2 border-gray-200 bg-white p-4 text-sm font-bold text-[#1b2b4b] focus:border-[#1b2b4b] shadow-sm" value={f.val} onChange={(e) => setFormData({...formData, [f.key]: e.target.value})} />
                </div>
            ))}

            <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#1b2b4b]">Address</label>
                <input className="w-full rounded-2xl border-2 border-gray-200 bg-white p-4 text-sm font-bold text-[#1b2b4b] focus:border-[#1b2b4b] shadow-sm" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-[#1b2b4b]">Region</label>
                    <input className="w-full rounded-2xl border-2 border-gray-200 bg-white p-4 text-sm font-bold text-[#1b2b4b] focus:border-[#1b2b4b] shadow-sm" value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-[#1b2b4b]">Gender</label>
                    <select className="w-full rounded-2xl border-2 border-gray-200 bg-white p-4 text-sm font-bold text-[#1b2b4b] outline-none focus:border-[#1b2b4b] shadow-sm" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>
            
            <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#1b2b4b]">Driver Type</label>
                <select className="w-full rounded-2xl border-2 border-gray-200 bg-white p-4 text-sm font-bold text-[#1b2b4b] outline-none focus:border-[#1b2b4b] shadow-sm" value={formData.driverType} onChange={(e) => setFormData({...formData, driverType: e.target.value})}>
                    <option value="Tricycle">Tricycle</option>
                    <option value="Jeepney">Jeepney</option>
                    <option value="UV Express">UV Express</option>
                    <option value="Taxi">Taxi</option>
                    <option value="Delivery Rider">Delivery Rider</option>
                </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {[
                { label: "Plate number", key: "plate" }, 
                { label: "Vehicle make & model", key: "vehicle" }, 
                { label: "Year", key: "year" }, 
                { label: "Primary route", key: "route" }
            ].map((field) => (
              <div key={field.label} className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#1b2b4b]">{field.label}</label>
                <input 
                    className="w-full rounded-2xl border-2 border-gray-200 bg-white p-4 text-sm font-bold text-[#1b2b4b] focus:border-[#1b2b4b] shadow-sm" 
                    placeholder="Enter details..."
                    value={formData[field.key as keyof typeof formData]} 
                    onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                />
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            {["OR/CR copy", "Franchise / MTOP", "Fuel receipt"].map((d) => (
              <div key={d} className={cn("p-4 flex items-center gap-4 bg-white border-2 rounded-[24px] shadow-sm transition-all", uploadedDocs.includes(d) ? "border-[#f5a623]" : "border-gray-200")}>
                <div className="w-12 h-12 rounded-2xl bg-gray-50 grid place-items-center"><FileText className="text-[#1b2b4b]" size={20} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-[#1b2b4b] truncate">{d}</p>
                  <p className="text-[10px] text-[#8c8b88]">{uploadedDocs.includes(d) ? "Uploaded successfully" : "PDF, JPG · Max 5MB"}</p>
                </div>
                <button onClick={() => toggleUpload(d)} className={cn("rounded-full px-4 py-2 text-[11px] font-bold flex items-center gap-1 transition-colors", uploadedDocs.includes(d) ? "bg-emerald-50 text-emerald-600" : "bg-[#1b2b4b] text-white")}>
                  {uploadedDocs.includes(d) ? <><Check size={12}/> Done</> : <><Upload size={12} /> Upload</>}
                </button>
              </div>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="space-y-2">
                <p className="text-[11px] font-bold text-[#8c8b88] uppercase tracking-wider">Driver Details</p>
                <div className="bg-white border-2 border-gray-100 rounded-[24px] p-5 space-y-3 shadow-sm">
                    <div className="flex justify-between text-xs"><span className="text-[#8c8b88]">Name</span><span className="font-bold text-[#1b2b4b]">{formData.name}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-[#8c8b88]">Address</span><span className="font-bold text-[#1b2b4b]">{formData.address}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-[#8c8b88]">Gender</span><span className="font-bold text-[#1b2b4b]">{formData.gender}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-[#8c8b88]">Type</span><span className="font-bold text-[#1b2b4b]">{formData.driverType}</span></div>
                </div>
            </div>
            <div className="space-y-2">
                <p className="text-[11px] font-bold text-[#8c8b88] uppercase tracking-wider">Vehicle & Route</p>
                <div className="bg-white border-2 border-gray-100 rounded-[24px] p-5 space-y-3 shadow-sm">
                    <div className="flex justify-between text-xs"><span className="text-[#8c8b88]">Plate</span><span className="font-bold text-[#1b2b4b]">{formData.plate}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-[#8c8b88]">Vehicle</span><span className="font-bold text-[#1b2b4b]">{formData.vehicle}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-[#8c8b88]">Route</span><span className="font-bold text-[#1b2b4b]">{formData.route}</span></div>
                </div>
            </div>
            <div className="space-y-2">
                <p className="text-[11px] font-bold text-[#8c8b88] uppercase tracking-wider">Documents</p>
                <div className="bg-white border-2 border-gray-100 rounded-[24px] p-5 space-y-3 shadow-sm">
                    {["OR/CR copy", "Franchise / MTOP", "Fuel receipt"].map(d => (
                        <div key={d} className="flex justify-between text-xs items-center">
                            <span className="text-[#8c8b88]">{d}</span>
                            {uploadedDocs.includes(d) ? <CheckCircle2 size={16} className="text-emerald-500" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-200" />}
                        </div>
                    ))}
                </div>
            </div>
            <label className="flex items-center gap-3 pt-2 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 accent-[#f5a623]" onChange={(e) => setChecked(e.target.checked)} />
              <span className="text-[12px] font-bold text-[#1b2b4b] group-hover:text-[#f5a623] transition-colors">I certify that all information is true.</span>
            </label>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md p-5 bg-white border-t border-gray-100 z-50 flex gap-3">
        {step > 1 && (
          <button onClick={back} className="flex-1 rounded-2xl border-2 border-gray-100 py-3.5 text-sm font-bold text-[#1b2b4b] hover:bg-gray-50 transition-all">Previous</button>
        )}
        <button
          onClick={next}
          disabled={step === 4 && !checked}
          className={cn("rounded-2xl bg-[#1b2b4b] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1b2b4b]/20 hover:scale-[1.01] hover:bg-[#1b2b4b]/90 active:scale-95 disabled:opacity-50 transition-all", step === 1 ? "flex-[2]" : "flex-1")}
        >
          {step === 4 ? "Submit" : "Continue"}
        </button>
      </div>
    </MobileShell>
  );
}