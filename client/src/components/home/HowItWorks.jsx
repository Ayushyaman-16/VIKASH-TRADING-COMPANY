import {
  Search,
  ShoppingCart,
  ClipboardCheck,
  Truck,
} from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Browse Products",
      description:
        "Explore our available FMCG products and choose what your shop needs.",
      icon: Search,
    },
    {
      number: "02",
      title: "Add to Cart",
      description:
        "Select products and quantities, then add them to your shopping cart.",
      icon: ShoppingCart,
    },
    {
      number: "03",
      title: "Place Order",
      description:
        "Review your order details and submit your order request.",
      icon: ClipboardCheck,
    },
    {
      number: "04",
      title: "Order Processing",
      description:
        "We confirm, process, and arrange delivery for your order.",
      icon: Truck,
    },
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-red-600">
            Simple Ordering Process
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            How Ordering Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Order your required products in a few simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl bg-white p-8 shadow-sm"
              >
                <p className="absolute right-6 top-5 text-4xl font-bold text-red-100">
                  {step.number}
                </p>

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 text-white">
                  <Icon size={27} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <button className="rounded-lg bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700">
            Start Ordering →
          </button>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;