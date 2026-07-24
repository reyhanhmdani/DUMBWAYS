import { useOutletContext, Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { cartList, setCartList } = useOutletContext();

  // Fungsi untuk tambah keranjang atau hapus
  const handleTambah = (idProduk) => {
    const keranjangBaru = cartList.map((cart) => 
      cart.id === idProduk ? { ...cart, quantity: (cart.quantity || 0) + 1 } : cart
    );
    setCartList(keranjangBaru);
  };

  const handleMinus = (idProduk) => {
    const keranjangBaru = cartList.map((cart) =>
      cart.id === idProduk && (cart.quantity || 0) > 0 ? { ...cart, quantity: (cart.quantity || 0) - 1 } : cart,
    );
    setCartList(keranjangBaru);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Keranjang Belanja</h1>

        {cartList.length === 0 ? (
          <div className="text-center py-24 px-6 sm:py-32 lg:px-8 border-2 border-dashed border-gray-200 rounded-xl mt-12 bg-gray-50/50">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="mt-2 text-xl font-semibold text-gray-900 mb-8">Keranjang belanja Anda masih kosong</h2>
            <Link to="/Product">
              <Button className="px-8 py-6 text-base cursor-pointer">Mulai Belanja Sekarang</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="lg:col-span-7"
            >
              <h2
                id="cart-heading"
                className="sr-only"
              >
                Items Di Keranjang
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {cartList.map((cart) => (
                  <li
                    key={cart.id}
                    className="flex py-6 sm:py-10"
                  >
                    <div className="shrink-0">
                      <img
                        src={cart.imageSrc}
                        alt={cart.imageAlt}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48 border border-gray-200"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        {/* Info Baju */}
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                to={`/Product`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {cart.title}
                              </Link>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">{cart.color}</p>
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{cart.size}</p>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">{cart.price}</p>
                        </div>

                        {/* Tombol Plus Minus Kuantitas */}
                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label
                            htmlFor={`quantity-${cart.id}`}
                            className="sr-only"
                          >
                            Quantity, {cart.title}
                          </label>
                          <div className="flex items-center border border-gray-300 rounded-md w-fit bg-white">
                            <button
                              type="button"
                              onClick={() => handleMinus(cart.id)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md transition cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 text-sm font-medium border-x border-gray-300 text-gray-900">{cart.quantity || 0}</span>
                            <button
                              type="button"
                              onClick={() => handleTambah(cart.id)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md transition cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          {/* Ikon Hapus (Trash) */}
                          <div className="absolute top-0 right-0">
                            <button
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500 cursor-pointer transition"
                            >
                              <span className="sr-only">Remove</span>
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* ===================== RINGKASAN BELANJA (ORDER SUMMARY) ===================== */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900 font-medium">$105.00</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm">
                    <span>Shipping estimate</span>
                  </dt>
                  <dd className="text-gray-900 font-medium">$5.00</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm">
                    <span>Tax estimate</span>
                  </dt>
                  <dd className="text-gray-900 font-medium">$8.32</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-bold text-gray-900">Order total</dt>
                  <dd className="text-base font-bold text-gray-900">$118.32</dd>
                </div>
              </dl>

              <div className="mt-6">
                <Button className="w-full text-base py-6 cursor-pointer">Checkout</Button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link
                    to="/Product"
                    className="font-medium text-indigo-600 hover:text-indigo-500 transition"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
