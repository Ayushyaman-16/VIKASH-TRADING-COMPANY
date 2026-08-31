import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X, ShoppingCart } from "lucide-react";

// Category Images
import biscuitsImg from "../assets/images/biscuits.PNG.png";
import bakeryImg from "../assets/images/bakery.PNG.png";
import snacksImg from "../assets/images/snacks.PNG.png";
import confectioneryImg from "../assets/images/confectionery.PNG.png";

// Product Images
import parleGOriginalImg from "../assets/images/parle-G Original.PNG.png";
import parleGGoldImg from "../assets/images/parle-G Gold.PNG.png";
import parleGMilkShaktiImg from "../assets/images/parle-G Milk Shakti.PNG.png";
import monacoClassicImg from "../assets/images/Monaco Classic.PNG.png";
import monacoPiriPiriImg from "../assets/images/monaco piri piri.PNG.png";
import krackJackOriginalImg from "../assets/images/KrackJack Original.PNG.png";
import krackJackButterImg from "../assets/images/KrackJack Butter.PNG.png";
import hideSeekImg from "../assets/images/Hide & Seek.PNG.png";
import hideSeekFabImg from "../assets/images/Hide & Seek Fab.PNG.png";
import marieGoldImg from "../assets/images/Marie Gold.PNG.png";
import cookies2020Img from "../assets/images/20-20 Cookies.PNG.png";
import happyHappyImg from "../assets/images/Happy Happy.PNG.png";
import kreamsGoldImg from "../assets/images/Kreams Gold.PNG.png";
import simplyGoodImg from "../assets/images/Simply Good.PNG.png";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addedProduct, setAddedProduct] = useState("");

  const navigate = useNavigate();

  const categories = [
    {
      name: "Biscuits",
      description: "Popular Parle biscuit varieties for retailers.",
      image: biscuitsImg,
      products: [
        {
          name: "Parle-G Original",
          image: parleGOriginalImg,
        },
        {
          name: "Parle-G Gold",
          image: parleGGoldImg,
        },
        {
          name: "Parle-G Milk Shakti",
          image: parleGMilkShaktiImg,
        },
        {
          name: "Monaco Classic",
          image: monacoClassicImg,
        },
        {
          name: "Monaco Piri Piri",
          image: monacoPiriPiriImg,
        },
        {
          name: "KrackJack Original",
          image: krackJackOriginalImg,
        },
        {
          name: "KrackJack Butter",
          image: krackJackButterImg,
        },
        {
          name: "Hide & Seek",
          image: hideSeekImg,
        },
        {
          name: "Hide & Seek Fab",
          image: hideSeekFabImg,
        },
        {
          name: "Marie Gold",
          image: marieGoldImg,
        },
        {
          name: "20-20 Cookies",
          image: cookies2020Img,
        },
        {
          name: "Happy Happy",
          image: happyHappyImg,
        },
        {
          name: "Kreams Gold",
          image: kreamsGoldImg,
        },
        {
          name: "Simply Good",
          image: simplyGoodImg,
        },
      ],
    },

    {
      name: "Cakes & Bakery",
      description: "Cakes, rusk and bakery products for every business.",
      image: bakeryImg,
      products: [],
    },

    {
      name: "Snacks",
      description: "Tasty snacks and popular products for your customers.",
      image: snacksImg,
      products: [],
    },

    {
      name: "Confectionery",
      description: "Candies and other confectionery products.",
      image: confectioneryImg,
      products: [],
    },
  ];

  // Explore category
  const handleExplore = (category) => {
    setSelectedCategory(category);

    setTimeout(() => {
      document
        .getElementById("product-details")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  // Enquire product
  const handleEnquiry = (productName) => {
    navigate(`/contact?product=${encodeURIComponent(productName)}`);
  };

  // ADD PRODUCT TO CART
  const handleAddToCart = (product) => {
    let cart = [];

    try {
      cart = JSON.parse(localStorage.getItem("vikashCart") || "[]");
    } catch (error) {
      cart = [];
    }

    const existingProductIndex = cart.findIndex(
      (item) => item.name === product.name
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({
        name: product.name,
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem("vikashCart", JSON.stringify(cart));

    // Navbar cart count update करण्यासाठी
    window.dispatchEvent(new Event("cartUpdated"));

    // Added message
    setAddedProduct(product.name);

    setTimeout(() => {
      setAddedProduct("");
    }, 2000);
  };

  return (
    <section className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-red-600">
            Our Products
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
            Explore Our Product Range
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            Explore our range of quality Parle products available for retailers
            and business partners.
          </p>
        </div>

        {/* Category Cards */}
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="h-52 overflow-hidden bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {category.name}
                </h2>

                <p className="mt-3 min-h-[72px] leading-7 text-gray-600">
                  {category.description}
                </p>

                <button
                  onClick={() => handleExplore(category)}
                  className="mt-6 flex items-center gap-2 font-semibold text-red-600 transition hover:gap-3"
                >
                  Explore Products
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PRODUCT DETAILS */}
        {selectedCategory && (
          <div
            id="product-details"
            className="mt-16 scroll-mt-10 rounded-3xl bg-white p-8 shadow-lg md:p-12"
          >
            <div className="flex flex-col justify-between gap-5 border-b border-gray-200 pb-6 md:flex-row md:items-center">
              <div>
                <p className="font-semibold uppercase tracking-widest text-red-600">
                  Product Details
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                  {selectedCategory.name}
                </h2>

                <p className="mt-3 text-gray-600">
                  Explore all available products in this category.
                </p>
              </div>

              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 self-start rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100"
              >
                <X size={18} />
                Close
              </button>
            </div>

            {/* Product Cards */}
            {selectedCategory.products.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {selectedCategory.products.map((product) => (
                  <div
                    key={product.name}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
                  >
                    {/* Product Image */}
                    <div className="flex h-64 items-center justify-center bg-slate-50 p-5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Product Information */}
                    <div className="border-t border-gray-100 p-5">
                      <h3 className="text-xl font-bold text-slate-900">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        Contact us for wholesale availability
                      </p>

                      {/* Buttons */}
                      <div className="mt-5 grid grid-cols-2 gap-3">

                        {/* ADD TO CART */}
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
                        >
                          <ShoppingCart size={18} />

                          {addedProduct === product.name
                            ? "Added!"
                            : "Add to Cart"}
                        </button>

                        {/* ENQUIRE */}
                        <button
                          onClick={() => handleEnquiry(product.name)}
                          className="flex items-center justify-center gap-2 rounded-xl border border-red-500 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Enquire
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <h3 className="text-2xl font-bold text-slate-900">
                  Products Coming Soon
                </h3>

                <p className="mt-3 text-gray-600">
                  We will add products from this category soon.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bottom Section */}
        <div className="mt-16 rounded-3xl bg-slate-900 px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-bold">
            Looking for Wholesale Products?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Partner with Vikash Trading Co. for quality products, competitive
            pricing, and reliable supply.
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Contact Us
            <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default Products;