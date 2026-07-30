import { createContext, useContext, useState, useEffect } from "react";

// wadah global
const TodoContext = createContext(null);

// provider
export function TodoProvider({ children: content }) {
  const [todos, setTodos] = useState([
    { id: 1, title: "Belajar React Context API", completed: false },
    { id: 2, title: "Membuat To-Do App Day 13", completed: true },
  ]);

  // penambah id automatis
  const [idCounter, setIdCounter] = useState(3);

  const [isLoading, setIsLoading] = useState(true); // loading pas pertama buka
  const [isSubmitting, setIsSubmitting] = useState(false); // loading pas klik save
  const [updatingId, setIsUpdatingId] = useState(new Set()); // loading pas update
  const [deletingId, setDeletingId] = useState(new Set()); // loading pas delete

  // ibarat alarm hpnya itu mau bunyi setengah detik lagi, dia bakal bunyi kalau ga di apa apa kan, terus, yang return itu dia ibarat tombol batal, kalau alarm nya itu di batalkan jadi ga jalan 0.5 tadi
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // create
  const addTodo = (titleText) => {
    const cleanTitle = titleText.trim();
    if (!cleanTitle) return;

    // Aktifkan loading submit agar user tidak spam/double click saat proses simpan
    setIsSubmitting(true);

    const newtodo = {
      id: idCounter,
      title: cleanTitle,
      completed: false,
    };

    setTodos((prev) => [newtodo, ...prev]);
    setIdCounter((prev) => prev + 1);

    // proses simpan selama 500ms/setengah detik
    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  };

  // update
  const updateTodo = (todoId) => {
    // Tandai Id yang sedang di proses update
    setIsUpdatingId((prev) => new Set([...prev, todoId]));

    setTodos((prev) =>
      prev.map((item) =>
        item.id === todoId ? { ...item, completed: !item.completed } : item
      )
    );

    setTimeout(() => {
      setIsUpdatingId((prev) => {
        const next = new Set(prev);
        next.delete(todoId);
        return next;
      });
    }, 500);
  };

  // delete
  // Tandai Id yang sedang di proses update
  const deleteTodo = (todoId) => {
    setDeletingId((prev) => new Set([...prev, todoId]));

    // disini kita hapus nih id yang kita pilih
    setTodos((prev) => prev.filter((item) => item.id !== todoId));

    setTimeout(() => {
      setDeletingId((prev) => {
        const next = new Set(prev);
        next.delete(todoId);
        return next;
      });
    }, 300);
  };

  const isiGudangData = {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    isLoading,
    isSubmitting,
    updatingId,
    deletingId,
  };
  return (
    <TodoContext.Provider value={isiGudangData}>{content}</TodoContext.Provider>
  );
}
// Custom Hook untuk mengambil data di komponen lain
// eslint-disable-next-line react-refresh/only-export-components
export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo harus dipakai di dalam <TodoProvider>!");
  }
  return context;
}
