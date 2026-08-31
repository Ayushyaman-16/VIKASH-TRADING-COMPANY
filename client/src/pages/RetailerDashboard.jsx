import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ClipboardList,
  LogOut,
  Store,
  ArrowRight,
  Clock,
} from "lucide-react";

function RetailerDashboard() {
  const navigate = useNavigate();

  const email = localStorage.getItem("vikashRetailerEmail") || "Retailer";

  // Orders localStorage मधून घेणे
  const orders = JSON.parse(localStorage.getItem("vikashOrders") || "[]");

  // Pending orders
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  );

  // Latest 5 orders
  const recentOrders = [...orders].reverse().slice(0, 5);

  const handleLogout = () => {
    localStorage.removeItem("vikashRetailerLoggedIn");
    localStorage.removeItem("vikashRetailerEmail");

    navigate("/login");
  };

  return (
    <section className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Welcome Section */}
        <div className="rounded-2xl bg-slate-900 p-8 text-white">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-red-400">
                Retailer Dashboard
              </p>

              <h1 className="mt-3 text-3xl font-bold">
                Welcome Back!
              </h1>

              <p className="mt-3 text-slate-300">
                Logged in as: {email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* Available Products */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Available Products
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  100+
                </h2>
              </div>

              <div className="rounded-xl bg-red-100 p-3 text-red-600">
                <Package size={25} />
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Total Orders
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {orders.length}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <ShoppingCart size={25} />
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Pending Orders
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {pendingOrders.length}
                </h2>
              </div>

              <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                <ClipboardList size={25} />
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Account Status
                </p>

                <h2 className="mt-2 text-xl font-bold text-green-600">
                  Active
                </h2>
              </div>

              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <Store size={25} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">

          {/* Browse Products */}
          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-red-100 p-3 text-red-600">
                <Package size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Browse Products
                </h2>

                <p className="text-sm text-gray-500">
                  View all available FMCG products.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              View Products
              <ArrowRight size={20} />
            </button>
          </div>

          {/* My Orders */}
          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-200 p-3 text-slate-700">
                <ShoppingCart size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  My Orders
                </h2>

                <p className="text-sm text-gray-500">
                  View and manage your product orders.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/orders")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              View Orders
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-8 rounded-2xl bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-red-600" size={24} />

            <h2 className="text-xl font-bold text-slate-900">
              Recent Orders
            </h2>
          </div>

          {/* Orders Exist */}
          {recentOrders.length > 0 ? (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-left text-sm text-gray-500">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Product</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr
                      key={order.id || index}
                      className="border-b last:border-none"
                    >
                      <td className="p-3 font-medium text-slate-900">
                        #{order.id || index + 1}
                      </td>

                      <td className="p-3 text-gray-600">
                        {order.product || "Product"}
                      </td>

                      <td className="p-3 text-gray-600">
                        {order.quantity || 1}
                      </td>

                      <td className="p-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            order.status === "Pending"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={() => navigate("/orders")}
                className="mt-6 flex items-center gap-2 font-semibold text-red-600 hover:text-red-700"
              >
                View All Orders
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            /* No Orders */
            <div className="py-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <ShoppingCart
                  size={30}
                  className="text-gray-400"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-700">
                No Orders Yet
              </h3>

              <p className="mt-2 text-gray-500">
                Your recent orders will appear here.
              </p>

              <button
                onClick={() => navigate("/products")}
                className="mx-auto mt-5 flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
              >
                Browse Products
                <Package size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default RetailerDashboard;