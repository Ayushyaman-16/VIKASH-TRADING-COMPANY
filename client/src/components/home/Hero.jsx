import {
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
} from "lucide-react";

import heroProducts from "../../assets/images/hero-product.PNG.png";

function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-20 bg-gradient-to-br from-slate-50 via-white to-red-50"
    >
      <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">

        {/* Left Content */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            <Truck size={18} />
            Trusted FMCG Distributor
          </div>

          <h1 className="text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
            Your Trusted Partner for
            <span className="block text-red-600">
              Everyday Essentials
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Vikash Trading Company. provides quality FMCG products to retailers
            with reliable supply, competitive pricing, and fast delivery.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#products"
              className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Browse Products
              <ArrowRight size={20} />
            </a>

            <a
              href="#retailer"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-red-600 hover:text-red-600"
            >
              Become a Retailer
            </a>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div>
              <ShoppingBag className="mb-2 text-red-600" size={28} />
              <p className="font-semibold text-slate-900">Wide Range</p>
              <p className="text-sm text-gray-500">Quality products</p>
            </div>

            <div>
              <Truck className="mb-2 text-red-600" size={28} />
              <p className="font-semibold text-slate-900">Fast Delivery</p>
              <p className="text-sm text-gray-500">Reliable supply</p>
            </div>

            <div>
              <ShieldCheck className="mb-2 text-red-600" size={28} />
              <p className="font-semibold text-slate-900">Trusted</p>
              <p className="text-sm text-gray-500">Business partner</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-red-100 blur-3xl"></div>

          <div className="relative rounded-3xl bg-gradient-to-br from-red-600 to-red-800 p-10 shadow-2xl">

            {/* Image */}
            <img
              src={heroProducts}
              alt="Vikash Trading FMCG Products"
              className="h-80 w-full rounded-2xl object-cover"
            />

            <div className="mt-6 rounded-2xl bg-white p-8">
              <p className="text-sm font-semibold text-red-600">
                VIKASH TRADING CO.
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Quality Products.
                <br />
                Reliable Distribution.
              </h2>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-red-50 p-5">
                  <p className="text-3xl font-bold text-red-600">100+</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Products
                  </p>
                </div>

                <div className="rounded-xl bg-red-50 p-5">
                  <p className="text-3xl font-bold text-red-600">50+</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Retailers
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
                <p className="text-sm text-gray-300">
                  Serving Retailers With
                </p>

                <p className="mt-2 text-xl font-bold">
                   Quality Parle Products
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;