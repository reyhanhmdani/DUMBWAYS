import { useTodo } from "@/context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, isLoading } = useTodo();

  if (isLoading) {
    return (
      <div className="text-center py-12 space-y-3">
        <div className="inline-block w-8 h-8 border-2 border-cyan-400 border-r-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
        <p className="text-xs font-mono text-cyan-400/80 tracking-widest uppercase">
          LOADING...
        </p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
        <p className="text-xs font-mono text-slate-500 tracking-widest uppercase">
          Todo nya kaga ada nih...
        </p>
      </div>
    );
  }

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="space-y-3">
      {/* Tracker Status Bar */}
      <div className="flex justify-between items-center px-1 text-[11px] font-mono tracking-wider text-slate-400 border-b border-slate-800 pb-2">
        <span>
          TOTAL TASKS: <strong className="text-cyan-400">{todos.length}</strong>
        </span>
        <span>
          COMPLETED:{" "}
          <strong className="text-emerald-400">{completedCount}</strong>
        </span>
      </div>

      {/* tampilan data */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
