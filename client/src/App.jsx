import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import TrustedBrands from "./components/home/TrustedBrands";
import ProductCategories from "./components/home/ProductCategories";
import WhyChooseUs from "./components/home/WhyChooseUs";
import HowItWorks from "./components/home/HowItWorks";
import BecomeRetailer from "./components/home/BecomeRetailer";

import Products from "./pages/Products";
import Login from "./pages/Login";
import RetailerDashboard from "./pages/RetailerDashboard";

/* =========================
   HOME PAGE
========================= */

function Home() {
  return (
    <>
      <Hero />
      <TrustedBrands />
      <ProductCategories />
      <WhyChooseUs />
      <HowItWorks />
      <BecomeRetailer />
    </>
  );
}

/* =========================
   ABOUT PAGE
========================= */

function About() {
  return (
    <section className="bg-slate-50">
      <div className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="font-semibold uppercase tracking-widest text-red-400">
            About Vikash Trading Company
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Your Reliable FMCG Distribution Partner
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            We provide quality FMCG products to retailers with reliable
            supply, competitive pricing, and dependable service.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="font-semibold uppercase tracking-widest text-red-600">
            Who We Are
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Supporting Retailers With Quality Products
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Vikash Trading Company is a trusted FMCG distribution company
            focused on supplying quality everyday products to retailers and
            business partners.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Our goal is to build strong and long-term relationships by
            providing reliable product availability, competitive wholesale
            pricing, and dependable delivery service.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <p className="text-4xl font-bold text-red-600">100+</p>
            <p className="mt-2 font-semibold text-slate-900">
              Products Available
            </p>
            <p className="mt-2 text-sm text-gray-600">
              A wide range of FMCG products for retailers.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <p className="text-4xl font-bold text-red-600">50+</p>
            <p className="mt-2 font-semibold text-slate-900">
              Retail Partners
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Growing together with our business partners.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <p className="text-2xl font-bold text-slate-900">
              Reliable Supply
            </p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Consistent availability of products to support your business.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <p className="text-2xl font-bold text-slate-900">
              Trusted Brands
            </p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Supplying popular FMCG brands and quality products.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl bg-red-600 px-8 py-12 text-center text-white">
          <p className="font-semibold uppercase tracking-widest text-red-100">
            Our Mission
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold">
            To Become a Dependable Distribution Partner for Every Retailer
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-red-50">
            We aim to provide the right products, competitive prices,
            reliable supply, and excellent service to help retailers grow.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================
   CONTACT PAGE
========================= */

function Contact() {
  const [searchParams] = useSearchParams();

  const selectedProduct = searchParams.get("product") || "";

  const getInitialFormData = (product) => ({
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

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const initialData = getInitialFormData(selectedProduct);

    setFormData(initialData);
    setErrors({});
    setSuccessMessage("");

    sessionStorage.setItem(
      "vikashEnquiryData",
      JSON.stringify(initialData)
    );
  }, [selectedProduct]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.product.trim()) {
      newErrors.product = "Please select a product.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    if (!formData.shopName.trim()) {
      newErrors.shopName = "Please enter your shop name.";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Please enter your mobile number.";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must contain at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && !/^\d*$/.test(value)) {
      return;
    }

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    sessionStorage.setItem(
      "vikashEnquiryData",
      JSON.stringify(updatedData)
    );

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    setSuccessMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    sessionStorage.setItem(
      "vikashEnquiryData",
      JSON.stringify(formData)
    );

    setSuccessMessage(
      `Thank you ${formData.name}! Your enquiry for ${formData.product} has been submitted successfully.`
    );

    setErrors({});
  };

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="font-semibold uppercase tracking-widest text-red-400">
            Get In Touch
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Contact Vikash Trading Co.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Have questions about our products or want to become a retail
            partner? Get in touch with our team.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="font-semibold uppercase tracking-widest text-red-600">
            Contact Information
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            Let's Grow Your Business Together
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Contact Vikash Trading Co. for product inquiries, wholesale
            pricing, retailer partnerships, and other business information.
          </p>

          <div className="mt-8 space-y-5">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="font-semibold text-slate-900">Phone</p>
              <p className="mt-1 text-gray-600">+91 94057 75338</p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="font-semibold text-slate-900">Email</p>
              <p className="mt-1 text-gray-600">
                info@vikashtrading.com
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="font-semibold text-slate-900">
                Business Hours
              </p>
              <p className="mt-1 text-gray-600">
                Monday - Saturday: 9:00 AM - 7:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Send Us a Message
          </h2>

          <p className="mt-2 text-gray-600">
            Fill in the form below and our team will get back to you.
          </p>

          {selectedProduct && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
                Selected Product
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {selectedProduct}
              </p>
            </div>
          )}

          {successMessage && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 font-medium text-green-700">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Product *
              </label>

              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="Select a product"
                className={`w-full rounded-lg border px-4 py-3 outline-none ${
                  errors.product
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-gray-100"
                }`}
              />

              {errors.product && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.product}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Full Name *
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full rounded-lg border px-4 py-3 outline-none ${
                  errors.name
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Shop Name *
              </label>

              <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                placeholder="Enter your shop name"
                className={`w-full rounded-lg border px-4 py-3 outline-none ${
                  errors.shopName
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              />

              {errors.shopName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.shopName}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Mobile Number *
              </label>

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                maxLength="10"
                placeholder="Enter 10-digit mobile number"
                className={`w-full rounded-lg border px-4 py-3 outline-none ${
                  errors.mobile
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              />

              {errors.mobile && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.mobile}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={`w-full rounded-lg border px-4 py-3 outline-none ${
                  errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Message *
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Tell us how we can help you"
                className={`w-full resize-none rounded-lg border px-4 py-3 outline-none ${
                  errors.message
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              />

              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-red-600 px-6 py-4 font-semibold text-white transition hover:bg-red-700"
            >
              Send Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* =========================
   CART PAGE
========================= */

function Cart() {
  return (
    <div className="min-h-screen bg-slate-50 p-20">
      <h1 className="text-4xl font-bold text-slate-900">
        Your Cart
      </h1>
    </div>
  );
}

/* =========================
   WHATSAPP FLOATING BUTTON
========================= */

function WhatsAppButton() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const selectedProduct = searchParams.get("product") || "";

  const whatsappNumber = "919405775338";

  let savedEnquiryData = {};

  try {
    savedEnquiryData = JSON.parse(
      sessionStorage.getItem("vikashEnquiryData") || "{}"
    );
  } catch (error) {
    savedEnquiryData = {};
  }

  const product =
    selectedProduct ||
    savedEnquiryData.product ||
    "";

  const hasFullDetails =
    savedEnquiryData.name ||
    savedEnquiryData.shopName ||
    savedEnquiryData.mobile ||
    savedEnquiryData.email ||
    savedEnquiryData.message;

  let whatsappMessage;

  if (hasFullDetails) {
    whatsappMessage = `Hello Vikash Trading Company,

NEW PRODUCT ENQUIRY

Product: ${product || "Not selected"}

Customer Name: ${savedEnquiryData.name || "Not provided"}

Shop Name: ${savedEnquiryData.shopName || "Not provided"}

Mobile Number: ${savedEnquiryData.mobile || "Not provided"}

Email Address: ${savedEnquiryData.email || "Not provided"}

Customer Message:
${savedEnquiryData.message || "No message provided"}

Please contact me regarding this enquiry.`;
  } else if (product) {
    whatsappMessage = `Hello Vikash Trading Company,

I am interested in ${product}.

Please provide me with wholesale availability and pricing details.`;
  } else {
    whatsappMessage = `Hello Vikash Trading Company,

I am interested in your products. Please provide me with more information.`;
  }

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition duration-300 hover:scale-110 hover:bg-green-600"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
}

/* =========================
   APP
========================= */

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />

        {/* RETAILER DASHBOARD */}
        <Route
          path="/dashboard"
          element={<RetailerDashboard />}
        />
      </Routes>

      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;