import { useState } from "react";
import "./App.css";
import { Outlet, NavLink } from "react-router";

function App() {
  const [cartList, setCartList] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-2xl font-black text-green-600 tracking-tight">Rey Kaos 👕</span>

          <nav className="flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) => `font-medium transition ${isActive ? "text-green-600" : "text-gray-500 hover:text-gray-900"}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/Product"
              className={({ isActive }) => `font-medium transition ${isActive ? "text-green-600" : "text-gray-500 hover:text-gray-900"}`}
            >
              Products
            </NavLink>
            <NavLink
              to="/Cart"
              className={({ isActive }) => `font-medium transition ${isActive ? "text-green-600" : "text-gray-500 hover:text-gray-900"}`}
            >
              Cart: {cartList.length}
            </NavLink>
          </nav>
        </div>
      </header>

      {/* letak halaman tampil */}
      <main className="flex-1 px-4">
        <Outlet context={{ cartList, setCartList }} />
      </main>

      <footer className="text-center py-6 text-gray-400 text-sm border-t bg-white">Rey E-Commerce 2026</footer>
    </div>
  );
}

export default App;
