import {
  Truck,
  BadgeIndianRupee,
  ShieldCheck,
  Users,
} from "lucide-react";

function WhyChooseUs() {
  const features = [
    {
      title: "Reliable Supply",
      description:
        "Consistent product availability to help your business run smoothly.",
      icon: Truck,
    },
    {
      title: "Competitive Pricing",
      description:
        "Get quality FMCG products at competitive wholesale prices.",
      icon: BadgeIndianRupee,
    },
    {
      title: "Trusted Products",
      description:
        "Supply of popular and trusted brands for your customers.",
      icon: ShieldCheck,
    },
    {
      title: "Retailer Support",
      description:
        "Dedicated support to build long-term business relationships.",
      icon: Users,
    },
  ];

  return (
    <section id="why-choose-us" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-red-600">
            Why Choose Us
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            A Reliable Partner For Your Business
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            We focus on reliable distribution, quality products, and
            strong relationships with our retailers.
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 text-white">
                  <Icon size={27} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <div className="mt-14 rounded-3xl bg-slate-900 px-8 py-10 text-center text-white">
          <h3 className="text-2xl font-bold">
            Growing Together With Our Retail Partners
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Our goal is simple — provide the right products, reliable
            supply, and dependable service for your business.
          </p>
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;