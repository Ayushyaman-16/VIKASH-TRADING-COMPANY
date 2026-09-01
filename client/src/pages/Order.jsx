import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

function Order() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: localStorage.getItem("vikashRetailerEmail") || "",
    address: "",
    city: "",
    pincode: "",
    message: "",
  });

  // ==============================
  // LOGIN CHECK
  // ==============================
  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("vikashRetailerLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/login", {
        replace: true,
        state: {
          from: location.pathname,
        },
      });
    }
  }, [navigate, location.pathname]);

  // ==============================
  // LOAD CART
  // ==============================
  useEffect(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("vikashCart") || "[]"
      );

      setCartItems(Array.isArray(savedCart) ? savedCart : []);
    } catch (error) {
      console.error("Error loading cart:", error);
      setCartItems([]);
    }
  }, []);

  // ==============================
  // UPDATE CART
  // ==============================
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);

    localStorage.setItem(
      "vikashCart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ==============================
  // INCREASE QUANTITY
  // ==============================
  const increaseQuantity = (productName) => {
    const updatedCart = cartItems.map((item) =>
      item.name === productName
        ? {
            ...item,
            quantity: (item.quantity || 0) + 1,
          }
        : item
    );

    updateCart(updatedCart);
  };

  // ==============================
  // DECREASE QUANTITY
  // ==============================
  const decreaseQuantity = (productName) => {
    const updatedCart = cartItems
      .map((item) =>
        item.name === productName
          ? {
              ...item,
              quantity: (item.quantity || 0) - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  // ==============================
  // REMOVE ITEM
  // ==============================
  const removeItem = (productName) => {
    const updatedCart = cartItems.filter(
      (item) => item.name !== productName
    );

    updateCart(updatedCart);
  };

  // ==============================
  // FORM CHANGE
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // TOTAL QUANTITY
  // ==============================
  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  // ==============================
  // SUBMIT ORDER
  // ==============================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Create order
    const newOrder = {
      id: `ORD-${Date.now()}`,
      customer: formData,
      products: cartItems,
      totalProducts: cartItems.length,
      totalQuantity: totalQuantity,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    // Get existing orders
    let existingOrders = [];

    try {
      existingOrders = JSON.parse(
        localStorage.getItem("vikashOrders") || "[]"
      );

      if (!Array.isArray(existingOrders)) {
        existingOrders = [];
      }
    } catch (error) {
      existingOrders = [];
    }

    // Save order
    localStorage.setItem(
      "vikashOrders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    // Clear cart
    localStorage.removeItem("vikashCart");

    // Update navbar cart count
    window.dispatchEvent(new Event("cartUpdated"));

    // Show success
    setSubmitted(true);

    // Dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1800);
  };

  // ==============================
  // EMPTY CART
  // ==============================
  if (cartItems.length === 0 && !submitted) {
    return (
      <section className="min-h-screen bg-slate-100 py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
              <ShoppingCart size={38} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Your Cart is Empty
            </h2>

            <p className="mt-3 text-gray-500">
              Please add products before placing an order.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-7 rounded-xl bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Browse Products
            </button>

          </div>
        </div>
      </section>
    );
  }

  // ==============================
  // SUCCESS
  // ==============================
  if (submitted) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10">
        <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle size={45} />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Order Submitted!
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            Your order request has been submitted successfully.
            Our team will contact you regarding wholesale pricing
            and product availability.
          </p>

          <p className="mt-5 text-sm text-gray-500">
            Redirecting to your dashboard...
          </p>

        </div>
      </section>
    );
  }

  // ==============================
  // ORDER PAGE
  // ==============================
  return (
    <section className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6">

        {/* Back */}
        <button
          onClick={() => navigate("/cart")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-red-600"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </button>

        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
            Wholesale Order
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Place Your Order
          </h1>

          <p className="mt-3 text-gray-500">
            Enter your details and submit your product order request.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid gap-8 lg:grid-cols-3">

            {/* ==============================
                CUSTOMER DETAILS
            ============================== */}
            <div className="rounded-2xl bg-white p-7 shadow-sm lg:col-span-2">

              <div className="flex items-center gap-3 border-b border-gray-100 pb-5">

                <div className="rounded-xl bg-red-100 p-3 text-red-600">
                  <User size={24} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Retailer Details
                  </h2>

                  <p className="text-sm text-gray-500">
                    Provide your contact and delivery information.
                  </p>
                </div>

              </div>

              {/* Name + Mobile */}
              <div className="mt-6 grid gap-5 md:grid-cols-2">

                {/* Name */}
                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Full Name *
                  </label>

                  <div className="relative">
                    <User
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-slate-300 py-3.5 pl-12 pr-4 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Mobile Number *
                  </label>

                  <div className="relative">
                    <Phone
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      maxLength="10"
                      placeholder="10-digit mobile number"
                      className="w-full rounded-xl border border-slate-300 py-3.5 pl-12 pr-4 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  </div>
                </div>

              </div>

              {/* Email */}
              <div className="mt-5">

                <label className="mb-2 block font-medium text-slate-700">
                  Email Address *
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-300 py-3.5 pl-12 pr-4 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />

                </div>
              </div>

              {/* Address */}
              <div className="mt-5">

                <label className="mb-2 block font-medium text-slate-700">
                  Delivery Address *
                </label>

                <div className="relative">

                  <MapPin
                    size={19}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Enter your complete shop/delivery address"
                    className="w-full resize-none rounded-xl border border-slate-300 py-3.5 pl-12 pr-4 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />

                </div>
              </div>

              {/* City + Pincode */}
              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    City *
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Enter your city"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Pincode *
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    maxLength="6"
                    placeholder="6-digit pincode"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

              </div>

              {/* Message */}
              <div className="mt-5">

                <label className="mb-2 block font-medium text-slate-700">
                  Additional Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any additional requirements or information..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />

              </div>

            </div>

            {/* ==============================
                ORDER PRODUCTS
            ============================== */}
            <div className="h-fit rounded-2xl bg-white p-7 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-red-100 p-3 text-red-600">
                  <Package size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Your Products
                  </h2>

                  <p className="text-sm text-gray-500">
                    {totalQuantity} total items
                  </p>
                </div>

              </div>

              {/* Products */}
              <div className="mt-6 space-y-4">

                {cartItems.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-xl border border-gray-100 p-3"
                  >

                    <div className="flex gap-3">

                      {/* Image */}
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-50">

                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <Package
                            size={25}
                            className="text-gray-300"
                          />
                        )}

                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">

                        <h3 className="font-semibold text-slate-900">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                        {/* Quantity Controls */}
                        <div className="mt-2 flex items-center gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.name)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="min-w-5 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.name)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-red-600 text-white hover:bg-red-700"
                          >
                            <Plus size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.name)
                            }
                            className="ml-auto text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

              {/* Summary */}
              <div className="mt-6 border-t border-gray-100 pt-5">

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    Total Products
                  </span>

                  <span className="font-bold text-slate-900">
                    {cartItems.length}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-gray-600">
                    Total Quantity
                  </span>

                  <span className="font-bold text-slate-900">
                    {totalQuantity}
                  </span>
                </div>

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-4 font-semibold text-white transition hover:bg-red-700"
              >
                <ShoppingCart size={20} />
                Submit Order Request
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                Our team will contact you regarding wholesale pricing
                and product availability.
              </p>

            </div>

          </div>

        </form>

      </div>
    </section>
  );
}

export default Order;