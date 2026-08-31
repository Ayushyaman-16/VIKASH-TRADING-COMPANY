import { useState } from "react";
import {
  Store,
  ArrowRight,
  CheckCircle,
  User,
  Phone,
  Mail,
  MapPin,
  X,
} from "lucide-react";

function BecomeRetailer() {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    shopName: "",
    mobile: "",
    email: "",
    address: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const benefits = [
    "Access to a wide range of FMCG products",
    "Competitive wholesale pricing",
    "Reliable product supply",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.shopName.trim()) {
      newErrors.shopName = "Please enter your shop name.";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Please enter your mobile number.";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter your shop address.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSuccessMessage(
      `Thank you ${formData.fullName}! Your retailer registration request has been submitted successfully.`
    );

    setFormData({
      fullName: "",
      shopName: "",
      mobile: "",
      email: "",
      address: "",
      message: "",
    });

    setTimeout(() => {
      setSuccessMessage("");
      setIsOpen(false);
    }, 3000);
  };

  return (
    <>
      <section id="retailer" className="scroll-mt-24 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl bg-red-600">
            <div className="grid items-center gap-10 px-8 py-14 md:grid-cols-2 md:px-14">
              
              {/* Left Side */}
              <div className="text-white">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                  <Store size={32} />
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-red-100">
                  Grow Your Business
                </p>

                <h2 className="mt-3 text-4xl font-bold leading-tight">
                  Become a Vikash Trading Retail Partner
                </h2>

                <p className="mt-5 max-w-xl text-lg leading-8 text-red-50">
                  Join our growing retailer network and get access to quality
                  FMCG products with reliable supply and competitive pricing.
                </p>

                <div className="mt-8 space-y-3">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <CheckCircle size={20} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side */}
              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900">
                  Ready to Partner With Us?
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Register your shop and start ordering products through our
                  online ordering system.
                </p>

                <button
                  onClick={() => {
                    setIsOpen(true);
                    setSuccessMessage("");
                  }}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-800"
                >
                  Become a Retailer
                  <ArrowRight size={20} />
                </button>

                <p className="mt-4 text-center text-sm text-gray-500">
                  Already registered? Login to your account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-8 md:p-10">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 text-gray-500 transition hover:text-red-600"
            >
              <X size={28} />
            </button>

            <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
              Retailer Registration
            </p>

            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              Become a Retail Partner
            </h2>

            <p className="mt-3 text-gray-600">
              Fill in your business details to register with us.
            </p>

            {successMessage && (
              <div className="mt-6 rounded-xl border border-green-300 bg-green-50 p-4 text-green-700">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              
              {/* Full Name */}
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Full Name *
                </label>

                <div className="flex items-center rounded-xl border border-gray-300">
                  <User className="ml-4 text-gray-400" size={20} />

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl px-4 py-4 outline-none"
                  />
                </div>

                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Shop Name */}
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Shop Name *
                </label>

                <div className="flex items-center rounded-xl border border-gray-300">
                  <Store className="ml-4 text-gray-400" size={20} />

                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    placeholder="Enter your shop name"
                    className="w-full rounded-xl px-4 py-4 outline-none"
                  />
                </div>

                {errors.shopName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.shopName}
                  </p>
                )}
              </div>

              {/* Mobile and Email */}
              <div className="grid gap-6 md:grid-cols-2">
                
                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Mobile Number *
                  </label>

                  <div className="flex items-center rounded-xl border border-gray-300">
                    <Phone className="ml-4 text-gray-400" size={20} />

                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      maxLength="10"
                      className="w-full rounded-xl px-4 py-4 outline-none"
                    />
                  </div>

                  {errors.mobile && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.mobile}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Email Address *
                  </label>

                  <div className="flex items-center rounded-xl border border-gray-300">
                    <Mail className="ml-4 text-gray-400" size={20} />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full rounded-xl px-4 py-4 outline-none"
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Shop Address *
                </label>

                <div className="flex items-start rounded-xl border border-gray-300">
                  <MapPin className="ml-4 mt-4 text-gray-400" size={20} />

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete shop address"
                    rows="3"
                    className="w-full resize-none rounded-xl px-4 py-4 outline-none"
                  />
                </div>

                {errors.address && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Additional Message */}
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Additional Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any additional information (optional)"
                  rows="3"
                  className="w-full resize-none rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-red-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-red-700"
              >
                Submit Retailer Request
                <ArrowRight size={20} />
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default BecomeRetailer;