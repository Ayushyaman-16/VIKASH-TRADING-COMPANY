import { BadgeCheck } from "lucide-react";

import parleImage from "../../assets/images/parle.PNG.png";
import britanniaImage from "../../assets/images/britannia.PNG.png";

function TrustedBrands() {
  const brands = [
    {
      name: "PARLE",
      description: "Quality Biscuits, Snacks & Confectionery",
      image: parleImage,
    },
   
  ];

  return (
    <section
      id="brands"
      className="scroll-mt-20 bg-white py-20"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-red-600">
            Our Distribution Network
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Brands We Serve
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            We supply trusted FMCG products to retailers with reliable
            distribution and quality service.
          </p>
        </div>

        {/* Brand Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {brand.image ? (
                <div className="h-52 overflow-hidden bg-white">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex h-52 items-center justify-center bg-red-50">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <BadgeCheck size={34} />
                  </div>
                </div>
              )}

              <div className="p-7">
                <h3 className="text-2xl font-bold text-slate-900">
                  {brand.name}
                </h3>

                <p className="mt-3 text-gray-600">
                  {brand.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TrustedBrands;