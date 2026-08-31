import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
} from "lucide-react";

function Contact() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const selectedProduct = params.get("product") || "";

  const getInitialFormData = (product = "") => ({
    product: product,
    name: "",
    shopName: "",
    mobile: "",
    email: "",
    message: product
      ? `I am interested in ${product}. Please provide me with wholesale availability and pricing details.`
      : "",
  });

  const [formData, setFormData] = useState(
    getInitialFormData(selectedProduct)
  );

  const [successMessage, setSuccessMessage] = useState("");

  // Product बदलल्यावर form automatically update होईल
  useEffect(() => {
    setFormData(getInitialFormData(selectedProduct));
    setSuccessMessage("");
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setSuccessMessage("");
  };

  const validateForm = () => {
    if (
      !formData.product.trim() ||
      !formData.name.trim() ||
      !formData.shopName.trim() ||
      !formData.mobile.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill in all required fields.");
      return false;
    }

    if (!/^\d{10}$/.test(formData.mobile.trim())) {
      alert("Please enter a valid 10-digit mobile number.");
      return false;
    }

    return true;
  };

  // WhatsApp वर पूर्ण enquiry पाठवण्यासाठी
  const handleWhatsApp = () => {
    if (!validateForm()) return;

    const whatsappNumber = "919405775338";

    const whatsappMessage = `Hello Vikash Trading Co.

*NEW PRODUCT ENQUIRY*

*Product:* ${formData.product}

*Customer Details*

*Full Name:* ${formData.name}
*Shop Name:* ${formData.shopName}
*Mobile Number:* ${formData.mobile}
*Email Address:* ${formData.email || "Not provided"}

*Customer Message:*
${formData.message}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");
  };

  // Normal enquiry submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSuccessMessage(
      `Thank you ${formData.name}! Your enquiry for ${formData.product} has been submitted successfully.`
    );
  };

  return (
    <section className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-red-600">
            Get In Touch
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
            Contact Vikash Trading Co.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Send us your enquiry and our team will get back to you regarding
            product availability and wholesale requirements.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">

          {/* LEFT SIDE - CONTACT INFORMATION */}
          <div className="space-y-5">

            {/* Phone */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <Phone size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Phone
                  </h3>

                  <p className="mt-1 text-gray-600">
                    +91 94057 75338
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <MessageCircle size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    WhatsApp
                  </h3>

                  <p className="mt-1 text-gray-600">
                    +91 94057 75338
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </button>
            </div>

            {/* Email */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <Mail size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Email
                  </h3>

                  <p className="mt-1 text-gray-600">
                    info@vikashtrading.com
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <MapPin size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Location
                  </h3>

                  <p className="mt-1 text-gray-600">
                    India
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE - ENQUIRY FORM */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">

              <h2 className="text-2xl font-bold text-slate-900">
                Send Us a Message
              </h2>

              <p className="mt-2 text-gray-600">
                Fill in the form below and our team will get back to you.
              </p>

              {/* Selected Product */}
              {selectedProduct && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                    Selected Product
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {selectedProduct}
                  </p>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                  {successMessage}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >

                {/* Product */}
                <div>
                  <label className="mb-2 block font-semibold text-slate-800">
                    Product *
                  </label>

                  <input
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    placeholder="Select a product"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                {/* Name and Shop Name */}
                <div className="grid gap-6 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block font-semibold text-slate-800">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold text-slate-800">
                      Shop Name *
                    </label>

                    <input
                      type="text"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleChange}
                      placeholder="Enter your shop name"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  </div>

                </div>

                {/* Mobile */}
                <div>
                  <label className="mb-2 block font-semibold text-slate-800">
                    Mobile Number *
                  </label>

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your 10-digit mobile number"
                    maxLength="10"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block font-semibold text-slate-800">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="mb-2 block font-semibold text-slate-800">
                    Message *
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us how we can help you"
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                {/* Buttons */}
                <div className="grid gap-4 md:grid-cols-2">

                  {/* Send Enquiry */}
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-4 font-semibold text-white transition hover:bg-red-700"
                  >
                    Send Enquiry
                    <Send size={20} />
                  </button>

                  {/* WhatsApp */}
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-4 font-semibold text-white transition hover:bg-green-700"
                  >
                    <MessageCircle size={20} />
                    Send on WhatsApp
                  </button>

                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;