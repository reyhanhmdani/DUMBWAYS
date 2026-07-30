import { useAuth } from "@/context/AuthContext";
import { UserCheck, KeyRound } from "lucide-react";

export default function Dashboard() {
  const { user, token } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <UserCheck className="w-4 h-4" />
            <span>Informasi User</span>
          </div>
          <div className="space-y-1 text-xs text-slate-300">
            <p>
              <b>Nama:</b> {user?.name}
            </p>
            <p>
              <b>Email:</b> {user?.email}
            </p>
            <p>
              <b>Hak Akses (Role):</b> <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">{user?.role}</span>
            </p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <KeyRound className="w-4 h-4" />
            <span>Token nya</span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono break-all bg-slate-900 p-3 rounded-xl border border-white/5">{token}</p>
        </div>
      </div>
    </div>
  );
}
