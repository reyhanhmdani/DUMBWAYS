import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router";
import { Lock, Mail } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, simulasiLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // halaman default ketika si user login berhasil
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    simulasiLogin(email, password);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-xs text-slate-400">Masuk untuk mengakses Halaman Dashboard</p>
        </div>

        <form action="" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="email"
                placeholder="user@mail.com atau admin@mail.com" // btw kalau admin bakal auto role nya ADMIN ...
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 pl-10 pr-4 py-3 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div className="">
            <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 px-4 py-3 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-500/20"
          >
            Masuk Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
