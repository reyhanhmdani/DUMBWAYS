import { Routes, Route } from "react-router";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

import ProductCatalog from "@/pages/ProductsCatalog";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar />
      <Routes>
        {/* publik */}
        <Route path="/" element={<ProductCatalog />} />
        <Route path="/login" element={<Login />} />

        {/* private */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}
