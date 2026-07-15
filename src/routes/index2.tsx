import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, ShieldCheck, UserCheck } from "lucide-react";
import logo from "@/assets/uplift-logo.png";
import { MobileShell } from "@/components/mobile/MobileShell";

export const Route = createFileRoute("/index2")({
  component: Landing,
});

const features = [
  { icon: FileText, label: "Apply", to: "/apply" },
  { icon: UserCheck, label: "Verify", to: "/profile" },
  { icon: ShieldCheck, label: "Subsidy", to: "/subsidies" },
];

function Landing() {
  return (
    <MobileShell className="relative flex min-h-screen flex-col items-center justify-between bg-white px-6 py-10 text-[#1b2b4b] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute -top-[20%] -left-[20%] h-[500px] w-[500px] rounded-full bg-[#f5a623] blur-[150px] animate-pulse" />
        <div className="absolute top-[40%] -right-[20%] h-[400px] w-[400px] rounded-full bg-[#1b2b4b] blur-[120px]" />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center pt-8">
        <h1 className="text-7xl font-extrabold tracking-tighter">
          UP<span className="text-[#f5a623]">LIFT</span>
        </h1>
        <p className="mt-3 max-w-[280px] text-center text-sm font-medium leading-tight text-gray-500">
          Fast-Track Your Benefits with Secure<br/>
          Verification and Direct Subsidies.
        </p>

        <div className="my-6 w-full flex justify-center">
          <img src={logo} alt="UPLIFT Logo" className="h-64 w-64 object-contain drop-shadow-2xl" />
        </div>

        <div className="flex w-full justify-center gap-3">
          {features.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border border-white/20 bg-white/60 backdrop-blur-md transition-all hover:border-[#f5a623] hover:bg-amber-50 hover:shadow-lg active:scale-95"
            >
              <Icon className="h-6 w-6 text-[#1b2b4b]" strokeWidth={2} />
              <span className="text-xs font-bold text-[#1b2b4b]">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex w-full flex-col gap-3 mt-8 pb-6">
        <Link
          to="/signup"
          className="flex w-full items-center justify-center rounded-full bg-[#1b2b4b] py-4 text-[15px] font-bold text-white transition-all hover:bg-[#253960] active:scale-95 border border-[#1b2b4b]"
        >
          Create an account
        </Link>
        
        <Link
          to="/login"
          className="flex w-full items-center justify-center rounded-full border border-[#f5a623] bg-[#f5a623] py-4 text-[15px] font-bold text-[#1b2b4b] transition-all hover:bg-[#ffc107] active:scale-95"
        >
          I already have an account
        </Link>

        <Link
          to="/admin"
          className="flex w-full items-center justify-center rounded-full border border-dashed border-gray-300 py-4 text-[15px] font-bold text-gray-400 hover:border-[#f5a623] hover:text-[#f5a623] transition-all"
        >
          Admin login (demo)
        </Link>

        <div className="mt-6 flex justify-center">
          <p className="text-center text-xs text-gray-400">
            By continuing you agree to our{" "}
            <Link to="/terms" className="text-[#1b2b4b] font-bold underline underline-offset-2 hover:text-[#f5a623]">
              Terms & Privacy
            </Link>
          </p>
        </div>
      </div>
    </MobileShell>
  );
}