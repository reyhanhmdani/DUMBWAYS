import { useState } from "react";
import { ProductCard } from "./components/ProductCard";
import "./App.css";

const listProduk = [
  {
    id: 1,
    name: "Nike Air Max",
    price: "2.500.000",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWRpZGFzJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: "3.000.000",
    image:
      "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWRpZGFzJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: "1.800.000",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVtYSUyMHNob2VzfGVufDB8fDB8fHww",
  },
];

function App() {
  // State global untuk total keranjang -> total keranjang nya 0 dulu gitu
  const [cartCount, setCartCount] = useState(0);

  // Fungsi untuk tambah keranjang atau hapus
  const handleAddToCart = () => setCartCount((prev) => prev + 1);
  const handleRemoveFromCart = () => setCartCount((prev) => prev - 1);

  return (
    <div>
      <header className="header">
        <h1>Toko Sepatu Rey</h1>
        <div className="cart-info">🛒 Keranjang: {cartCount}</div>
      </header>

      <main className="product-list">
        {listProduk.map((produk) => {
          return (
            <ProductCard
              key={produk.id}
              name={produk.name}
              price={produk.price}
              image={produk.image}
              onAdd={handleAddToCart}
              onRemove={handleRemoveFromCart}
            />
          );
        })}
      </main>
    </div>
  );
}

export default App;
