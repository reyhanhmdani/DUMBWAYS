import { useTodo } from "@/context/TodoContext";

export default function TodoItem({ todo }) {
  const { updateTodo, deleteTodo, updatingId, deletingId } = useTodo();

  const isUpdating = updatingId.has(todo.id);
  const isDeleting = deletingId.has(todo.id);

  return (
    <li
      className={`group relative flex items-center justify-between p-3.5 rounded-xl border backdrop-blur-md transition-all duration-200 ${
        todo.completed
          ? "bg-slate-900/40 border-slate-800/60 text-slate-500"
          : "bg-slate-900/80 border-slate-800 hover:border-cyan-500/40 text-slate-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => updateTodo(todo.id)} // Langsung tercentang 0 detik!
          disabled={isUpdating || isDeleting}
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
            todo.completed
              ? "bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              : "border-slate-700 bg-slate-950 hover:border-cyan-400"
          }`}
        >
          {todo.completed && <span className="text-xs font-black">✓</span>}
        </button>

        {/* Teks Tugas */}
        <span
          className={`text-sm tracking-wide ${
            todo.completed
              ? "line-through text-slate-500"
              : "text-slate-200 font-medium"
          }`}
        >
          {todo.title}
        </span>

        {/*  Tulisan loading saat lagi di-update */}
        {isUpdating && (
          <span className="text-xs text-amber-400 animate-pulse font-mono">
            SAVING...
          </span>
        )}
      </div>

      {/* Tombol Hapus */}
      <button
        type="button"
        onClick={() => deleteTodo(todo.id)} // Langsung hilang 0 detik!
        disabled={isDeleting || isUpdating}
        className="text-slate-500 hover:text-red-400 hover:bg-red-950/40 p-1.5 rounded-lg text-xs font-mono transition-all duration-200 disabled:opacity-30"
      >
        {isDeleting ? "⏳ DELETING..." : "✖"}
      </button>
    </li>
  );
}
