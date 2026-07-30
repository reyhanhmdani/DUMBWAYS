import { Link, useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Lock, LayoutDashboard, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-wider text-emerald-400">
          <ShoppingBag className="w-6 h-6" />
          <span>ReyStore</span>
        </Link>

        {/* link navbar */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-emeral-400 transition">
            Products
          </Link>

          {isLoggedIn && (
            <Link to="/dashboard" className="flex items-center gap-1 hover:text-emerald-400 transition">
              <LayoutDashboard className="w-4 h-4" />
            </Link>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-4 border-2 border-white/10 pl-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs">{user?.name?.[0]}</div>
                <span className="text-xs text-slate-300">
                  {user?.name} ({user?.role})
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-xs bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white px-3 py-1.5 rounded-xl transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-500/20"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
