import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="font-bold text-lg">MERN Admin Panel</h1>

      <div className="flex gap-4 items-center">
        <span className="text-sm bg-gray-700 px-3 py-1 rounded">
          {role}
        </span>

        <button
          onClick={() => navigate("/dashboard")}
          className="hover:text-blue-400"
        >
          Dashboard
        </button>

        {/* ✅ PROFILE (FOR ALL) */}
        <button
          onClick={() => navigate("/profile")}
          className="hover:text-blue-400"
        >
          Profile
        </button>

        {/* ✅ ONLY ADMIN & MANAGER */}
        {(role === "admin" || role === "manager") && (
          <button
            onClick={() => navigate("/users")}
            className="hover:text-blue-400"
          >
            Users
          </button>
        )}

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}