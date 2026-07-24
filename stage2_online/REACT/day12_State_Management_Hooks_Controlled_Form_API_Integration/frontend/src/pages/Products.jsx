import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ListProduk } from "@/data/products";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/debounce";

export default function Product() {
  // Controlled form state untuk input nyari/pencarian
  const [kataKunci, setKataKunci] = useState("");

  // kita gunakan debouncing / kita tunda selama 500 milisecond
  const debouncedSearch = useDebounce(kataKunci, 500);

  // state untuk data API, loading dan error
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false; // mencegah race condition

    const fetchProductsFromBackEnd = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // menembak API yang ada di folder BACKEND...
        const response = await fetch(`http://localhost:3000/products?search=${encodeURIComponent(debouncedSearch)}`);

        if (!response.ok) {
          throw new Error(`Gagal memuat Produk (Status: ${response.status})`);
        }
        const result = await response.json();

        if (!ignore) {
          setProducts(result.data || []);
        }
      } catch (error) {
        if (!ignore) {
          setError(error.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchProductsFromBackEnd();

    return () => {
      ignore = true; // Set ignore ke true jika komponen re-render/unmount
    };
  }, [debouncedSearch]);

  // jika produk tidak ada/null/undefined maka tampilkan list produk dari data lokal, dan jika ada maka tampilkan data dari API
  const displayProducts = products.length > 0 ? products : ListProduk;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Controlled input search box */}
        <div className="mb-8 max-w-md mx-auto">
          <label
            htmlFor="search-input"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Cari Baju Kaos
          </label>
          <div className="relative">
            <input
              type="text"
              id="search-input"
              value={kataKunci} // controlled input
              onChange={(e) => setKataKunci(e.target.value)} // update kata kunci saat mengetik
              placeholder="Cari Baju Kaos"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm transition"
            />
            {kataKunci && (
              <button
                type="button"
                onClick={() => setKataKunci("")}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 hover:text-gray-900"
              >
                X
              </button>
            )}
          </div>
          <div className="mt-2 text-xs text-gray-500 flex justify-between">
            <span>Status: {kataKunci !== debouncedSearch ? "⏳ Mengetik..." : "✅ Siap Fetch"}</span>
            {debouncedSearch && <span>Mencari: "{debouncedSearch}"</span>}
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Baju Kaos</h2>

        {/* kondisi render/loading/error */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-500 text-sm">Sedang mencari produk di server...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200 mt-6">
            <p className="text-red-600 font-semibold">Terjadi Masalah Koneksi Server!</p>
            <p className="text-red-500 text-sm mt-1">{error}</p>
            <p className="text-xs text-gray-400 mt-2">Menampilkan data lokal sementara.</p>
          </div>
        ) : null}

        {/* data product */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="group relative"
            >
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    />
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.colors}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
              <div className="mt-2 relative z-10">
                <Link
                  to={`/Product/${product.id}`}
                  className="block w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Lihat Detail
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
