import { useParams, Link, useOutletContext } from "react-router";
import { ListProduk } from "@/data/products";
import { Button } from "@/components/ui/button";

const macamWarna = {
  colors: [
    { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
    { id: "gray", name: "Gray", classes: "bg-gray-200 checked:outline-gray-400" },
    { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: false },
    { name: "3XL", inStock: true },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const { id } = useParams();

  const { cartList, setCartList } = useOutletContext();

  const product = ListProduk.find((p) => p.id == id);
  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">Produk nya ga nemu</h2>
        <Link to="/Product">
          <Button className="mt-4">Balik ke List product</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = (e) => {
    const productBaru = { ...product, quantity: 1 };

    e.preventDefault();
    setCartList([...cartList, productBaru]);
    alert(`${product.title} berhasil masuk keranjang!`);
  };

  return (
    <div className="bg-white">
      <div className="pt-6 pb-16">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <ol
            role="list"
            className="flex items-center space-x-4"
          >
            <li className="text-sm">
              <Link
                to="/Product"
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-900 transition"
              >
                &larr; Kembali ke Daftar Produk
              </Link>
            </li>
          </ol>
        </nav>

        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:px-8">
          {/* Kiri */}
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="w-full rounded-xl object-cover object-center border border-gray-200 shadow-sm"
          />

          {/* Kanan */}
          <div className="mt-10 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.title}</h1>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-900 leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2 border-gray-200">Highlights</h3>
              <ul
                role="list"
                className="mt-4 list-disc space-y-2 pl-4 text-sm text-gray-600"
              >
                {product.highlights.map((highlight) => (
                  <li key={highlight}>
                    <span className="text-gray-800">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <p className="text-3xl font-bold tracking-tight text-gray-900">{product.price}</p>

              <form className="mt-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <fieldset
                    aria-label="Choose a color"
                    className="mt-4"
                  >
                    <div className="flex items-center gap-x-3">
                      {macamWarna.colors.map((color) => (
                        <div
                          key={color.id}
                          className="flex rounded-full outline -outline-offset-1 outline-black/10"
                        >
                          <input
                            defaultValue={color.id}
                            defaultChecked={color === macamWarna.colors[0]}
                            name="color"
                            type="radio"
                            aria-label={color.name}
                            className={classNames(
                              color.classes,
                              "size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3",
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <fieldset
                    aria-label="Choose a size"
                    className="mt-4"
                  >
                    <div className="grid grid-cols-4 gap-3">
                      {macamWarna.sizes.map((size) => (
                        <label
                          key={size.name}
                          aria-label={size.name}
                          className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                        >
                          <input
                            defaultValue={size.name}
                            defaultChecked={size === macamWarna.sizes[4]}
                            name="size"
                            type="radio"
                            disabled={!size.inStock}
                            className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                          />
                          <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">{size.name}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer transition"
                >
                  Add to bag
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
