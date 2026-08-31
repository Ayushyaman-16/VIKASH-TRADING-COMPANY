import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    const demoEmail = "retailer@vikashtrading.com";
    const demoPassword = "123456";

    if (email === demoEmail && password === demoPassword) {
      localStorage.setItem("vikashRetailerLoggedIn", "true");
      localStorage.setItem("vikashRetailerEmail", email);

      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-130px)] items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl md:p-10">
        {/* Login Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-white">
          <LogIn size={32} />
        </div>

        {/* Heading */}
        <div className="mt-7 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
            Vikash Trading Company
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-3 text-gray-500">
            Login to access your retailer dashboard.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-slate-300 py-4 pl-14 pr-4 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Password
            </label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-slate-300 py-4 pl-14 pr-14 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 font-semibold text-white transition hover:bg-red-700"
          >
            <LogIn size={20} />
            Login
          </button>
        </form>

        {/* Demo Login Details */}
        <div className="mt-6 rounded-xl bg-slate-100 p-4 text-sm">
          <p className="font-semibold text-slate-800">
            Demo Login Details
          </p>

          <p className="mt-2 text-slate-600">
            Email: retailer@vikashtrading.com
          </p>

          <p className="text-slate-600">
            Password: 123456
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;