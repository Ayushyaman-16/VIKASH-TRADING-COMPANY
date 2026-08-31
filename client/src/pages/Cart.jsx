import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  Package,
} from "lucide-react";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("vikashCart") || "[]"
    );

    setCartItems(savedCart);
  }, []);

  // Update localStorage and navbar cart count
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);

    localStorage.setItem(
      "vikashCart",
      JSON.stringify(updatedCart)
    );

    // Notify navbar that cart has changed
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    updateCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  // Remove product completely
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };

  // Clear complete cart
  const clearCart = () => {
    localStorage.removeItem("vikashCart");

    setCartItems([]);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Total quantity
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <section className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              onClick={() => navigate("/products")}
              className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-red-600"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </button>

            <h1 className="flex items-center gap-3 text-4xl font-bold text-slate-900">
              <ShoppingCart className="text-red-600" size={36} />
              Your Cart
            </h1>

            <p className="mt-2 text-gray-500">
              {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={18} />
              Clear Cart
            </button>
          )}
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
              <ShoppingCart size={38} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Your Cart is Empty
            </h2>

            <p className="mt-3 text-gray-500">
              Add some products to your cart and start ordering.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-7 rounded-xl bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Cart Products */}
            <div className="space-y-5 lg:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                >
                  {/* Product Image */}
                  <div className="flex h-28 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50 sm:w-36">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Package
                        size={40}
                        className="text-gray-300"
                      />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-900">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      FMCG Product
                    </p>

                    {/* Quantity Controls */}
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-slate-700 transition hover:bg-gray-100"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="min-w-8 text-center text-lg font-bold text-slate-900">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white transition hover:bg-red-700"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start rounded-lg p-3 text-red-600 transition hover:bg-red-50 sm:self-center"
                    title="Remove Product"
                  >
                    <Trash2 size={21} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-2xl bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-6 border-t border-gray-100 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    Total Products
                  </span>

                  <span className="font-bold text-slate-900">
                    {cartItems.length}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-gray-600">
                    Total Quantity
                  </span>

                  <span className="font-bold text-slate-900">
                    {totalItems}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-red-50 p-4">
                <p className="text-sm leading-6 text-red-700">
                  Submit your order request and our team will contact you
                  regarding wholesale pricing and availability.
                </p>
              </div>

              <button
                onClick={() => alert("Order functionality will be added in the next step.")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-4 font-semibold text-white transition hover:bg-red-700"
              >
                <ShoppingCart size={20} />
                Proceed to Order
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;