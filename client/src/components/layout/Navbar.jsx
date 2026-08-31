import { useEffect, useState } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

  // Cart मधील total quantity calculate करणे
  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("vikashCart") || "[]");

      const totalQuantity = cart.reduce(
        (total, item) => total + (item.quantity || 0),
        0
      );

      setCartCount(totalQuantity);
    } catch (error) {
      setCartCount(0);
    }
  };

  // Initial cart count आणि cart update event
  useEffect(() => {
    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const goToSection = (sectionId) => {
    if (window.location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-red-600 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm">
          <p>📞 +91 98765 43210 | ✉ info@vikashtrading.com</p>
          <p>🚚 Distributor of Parle Products</p>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <Link to="/" className="cursor-pointer">
            <h1 className="text-2xl font-bold text-slate-900">
              <span className="text-red-600">VIKASH</span> TRADING COMPANY
            </h1>

            <p className="text-xs text-gray-500">
              Distributor of Quality Products
            </p>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 font-medium text-gray-700 md:flex">
            <Link
              to="/"
              className="transition hover:text-red-600"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="transition hover:text-red-600"
            >
              Products
            </Link>

            <button
              onClick={() => goToSection("brands")}
              className="transition hover:text-red-600"
            >
              Brands
            </button>

            <Link
              to="/about"
              className="transition hover:text-red-600"
            >
              About Us
            </Link>

            <button
              onClick={() => goToSection("retailer")}
              className="transition hover:text-red-600"
            >
              Become a Retailer
            </button>

            <Link
              to="/contact"
              className="transition hover:text-red-600"
            >
              Contact Us
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-700 transition hover:text-red-600"
            >
              <ShoppingCart size={26} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login */}
            <Link
              to="/login"
              className="hidden rounded-md bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700 md:block"
            >
              Login
            </Link>

            {/* Mobile Menu */}
            <button className="md:hidden">
              <Menu size={28} />
            </button>

          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;