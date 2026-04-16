import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
      
      {/* REMOVE max-w + mx-auto */}
      <div className="w-full flex justify-between items-center px-6 py-3">

        {/* LEFT - BRAND */}
        <h1 className="font-bold text-xl tracking-wide">
          MERN Admin Panel
        </h1>

        {/* RIGHT - MENU */}
        <div className="flex gap-6 items-center text-sm">

          <span className="bg-gray-700 px-3 py-1 rounded-full text-xs capitalize">
            {role}
          </span>

          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-blue-400 transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="hover:text-blue-400 transition"
          >
            Profile
          </button>

          {(role === "admin" || role === "manager") && (
            <button
              onClick={() => navigate("/users")}
              className="hover:text-blue-400 transition"
            >
              Users
            </button>
          )}

          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}