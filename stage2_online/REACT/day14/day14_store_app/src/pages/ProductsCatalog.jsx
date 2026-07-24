import { useFetch } from "@/hooks/useFetch";
import { Star, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductCatalog() {
  // Fetching data dari fakestore API
  const { data: products, isLoading, error } = useFetch("/products");

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-teal-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-white/10 pb-4">
          <h1 className="text-3xl font-bold tracking-tight">Produk Rey Store</h1>
        </div>

        {/* Handling trio state: Loading Skeleton*/}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white/10 h-40 rounded-xl w-full">
                <div className="space-y-2">
                  <div className="bg-white/10 h-4 rounded w-3/4"></div>
                  <div className="bg-white/10 h-4 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Handling trio state: Error */}
        {error && (
          <div className="p-6 bg-rose500/20 border border-rose-500/30 rounded-2xl text-rose-300 text-center">
            Gagal memuat produk produk nya: {error}
          </div>
        )}

        {/* Handling trio state: Success */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <div
                key={product.id}
                className={cn(
                  "bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl",
                  "flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition duration-300"
                )}
              >
                <div>
                  {/* Image  */}
                  <div className="bg-white p-4 rounded-xl h-44 flex items-center justify-center mb-4 overflow-hidden">
                    <img src={product.image} alt={product.title} className="max-h-36 object-contain hover:scale-105 transition" />
                  </div>

                  {/* title dan kategori */}
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-sm mt-2 line-clamp-2 text-slate-100">{product.title}</h3>
                </div>

                {/* rating nya  dan harga */}
                <div className="pt-4 border-t border-white/5 mt-4 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-emerald-400 font-bold text-base">${product.price}</span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>
                        {product.rating?.rate} ({product.rating?.count})
                      </span>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Tambah Keranjang</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
