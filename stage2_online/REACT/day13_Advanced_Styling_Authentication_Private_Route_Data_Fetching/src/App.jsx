import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Glowing Ambient Light */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Container Glassmorphism */}
      <div className="relative w-full max-w-md bg-slate-900/70 backdrop-blur-2xl rounded-3xl border border-slate-800 p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {/* HEADER */}
        <div className="mb-6 border-b border-slate-800/80 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
              Todoliiissssst
            </h1>
          </div>
        </div>

        {/* INPUT TUGAS BARU */}
        <TodoForm />

        {/* DAFTAR TUGAS */}
        <TodoList />
      </div>
    </div>
  );
}
