import { useState } from "react";
import { useTodo } from "@/context/TodoContext";

export default function TodoForm() {
  // [CONTROLLED FORM] State lokal khusus untuk nampung ketikan di kotak input
  const [taskTitle, setTaskTitle] = useState("");

  const { addTodo, isSubmitting } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah halaman me-refresh!

    if (!taskTitle.trim()) return;

    // Panggil fungsi Tambah
    addTodo(taskTitle);

    // Kosongkan kembali kotak input
    setTaskTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative flex items-center group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl blur-xs opacity-30 group-hover:opacity-60 transition duration-300"></div>

        {/* input yang di bind oleh state taskTitle */}
        <input
          type="text"
          value={taskTitle} // Nilai diikat oleh state
          onChange={(e) => setTaskTitle(e.target.value)} // Update state saat ngetik
          placeholder="Ketik instruksi tugas baru..."
          disabled={isSubmitting}
          className="relative w-full bg-slate-900/90 text-slate-100 placeholder-slate-500 text-sm rounded-xl px-4 py-3 border border-slate-800 focus:outline-none focus:border-cyan-400/80 transition"
        />

        {/* Tombol dengan status loading saat lagi nambah */}
        <button
          type="submit"
          disabled={isSubmitting || !taskTitle.trim()}
          className="absolute right-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-cyan-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          {isSubmitting ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-slate-950 border-r-transparent rounded-full animate-spin"></span>
              <span>ADDING...</span>
            </>
          ) : (
            <span>+ ADD</span>
          )}
        </button>
      </div>
    </form>
  );
}
