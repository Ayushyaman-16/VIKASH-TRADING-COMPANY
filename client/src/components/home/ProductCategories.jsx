import { ArrowRight } from "lucide-react";

import biscuitsImg from "../../assets/images/biscuits.PNG.png";
import bakeryImg from "../../assets/images/bakery.PNG.png";
import snacksImg from "../../assets/images/snacks.PNG.png";
import confectioneryImg from "../../assets/images/confectionery.PNG.png";

function ProductCategories() {
  const categories = [
    {
      name: "Biscuits",
      description: "Popular everyday biscuit varieties",
      image: biscuitsImg,
    },
    {
      name: "Cakes & Bakery",
      description: "Cakes, rusk and bakery products",
      image: bakeryImg,
    },
    {
      name: "Snacks",
      description: "Tasty snacks for every retailer",
      image: snacksImg,
    },
    {
      name: "Confectionery",
      description: "Candies and other confectionery products",
      image: confectioneryImg,
    },
  ];

  return (
    <section
      id="products"
      className="scroll-mt-24 bg-gray-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-red-600">
            Explore Our Range
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Product Categories
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            Browse a wide range of quality FMCG products available for
            retailers and business partners.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  {category.name}
                </h3>

                <p className="mt-3 min-h-[56px] leading-7 text-gray-600">
                  {category.description}
                </p>

                <a
                  href="#products"
                  className="mt-5 flex items-center gap-2 font-semibold text-red-600 transition hover:gap-3"
                >
                  Explore Products
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProductCategories;