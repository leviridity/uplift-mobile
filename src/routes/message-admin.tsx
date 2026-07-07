import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Send, Mail } from "lucide-react";
import { MobileShell } from "@/components/mobile/MobileShell";
import { TopBar } from "@/components/mobile/TopBar";

export const Route = createFileRoute("/message-admin")({
  component: MessageAdminPage,
});

function MessageAdminPage() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <MobileShell>
      <TopBar title="Message UPLIFT Admin" onBack={() => history.back()} />
      
      <div className="p-6 pb-24 space-y-6">
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-[#f5a623]/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-[#f5a623]" />
            </div>
            <h2 className="font-black text-[#1b2b4b] text-lg">Send a message</h2>
            <p className="text-xs text-[#8c8b88] mt-1 max-w-[240px]">Our support admin will review your inquiry and respond via email within 24-48 hours.</p>
        </div>

        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-[#1b2b4b] uppercase tracking-wider ml-1">Subject</label>
                <input 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-bold text-[#1b2b4b] outline-none focus:border-[#f5a623]"
                    placeholder="Brief summary of your concern"
                />
            </div>

            <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-[#1b2b4b] uppercase tracking-wider ml-1">Message</label>
                <textarea 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-bold text-[#1b2b4b] outline-none focus:border-[#f5a623] h-40 resize-none"
                    placeholder="Provide details regarding your issue..."
                />
            </div>
        </div>

        <button 
            className="w-full py-4 rounded-2xl bg-[#1b2b4b] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#2a3f68] transition-all shadow-lg active:scale-95"
            onClick={() => alert("Message sent!")}
        >
            <Send size={18} /> Send Message
        </button>
      </div>
    </MobileShell>
  );
}