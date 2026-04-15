import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔹 Fetch logged-in user
  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/me");
      setUser({
        name: res.data.name,
        email: res.data.email,
        password: "",
      });
    } catch (err) {
      alert("Error fetching profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 🔹 Update profile
  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = { ...user };

      // ❌ don't send empty password
      if (!dataToSend.password) {
        delete dataToSend.password;
      }

      await API.put("/users/me", dataToSend);

      alert("Profile updated");
      fetchProfile();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="p-6">
      <Navbar />

      <h1 className="text-2xl font-bold mt-4">My Profile</h1>

      <form
        onSubmit={updateProfile}
        className="bg-white p-4 mt-4 rounded shadow w-1/2"
      >
        {/* NAME */}
        <input
          className="border p-2 w-full mb-2"
          value={user.name}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
        />

        {/* EMAIL (READ ONLY) */}
        <input
          className="border p-2 w-full mb-2 bg-gray-100"
          value={user.email}
          disabled
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
}