import React, { useState, useEffect } from "react";

export default function App() {
  // 1. Read (Inisialisasi state dari localStorage)
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("my_items");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Simpan ke localStorage setiap ada perubahan pada 'items'
  useEffect(() => {
    localStorage.setItem("my_items", JSON.stringify(items));
  }, [items]);

  // 2. Create / Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (editId !== null) {
      // Update data
      setItems(items.map((item) => (item.id === editId ? { ...item, name: input } : item)));
      setEditId(null);
    } else {
      // Create data baru
      const newItem = { id: Date.now(), name: input };
      setItems([...items, newItem]);
    }
    setInput("");
  };

  // Persiapan Edit
  const handleEdit = (item) => {
    setEditId(item.id);
    setInput(item.name);
  };

  // 3. Delete
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>CRUD React LocalStorage</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nama item..." />
        <button type="submit">{editId !== null ? "Update" : "Tambah"}</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ margin: "10px 0" }}>
            {item.name} &nbsp;
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
