import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editUser, setEditUser] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    status: "active",
  });

  const role = localStorage.getItem("role");

  //  FETCH USERS (FIXED with useCallback)
  const fetchUsers = useCallback(async () => {
    try {
      const res = await API.get(
        `/users?page=${page}&search=${search}`
      );
      setUsers(res.data.users);
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching users");
    }
  }, [page, search]);

  //  useEffect (NO ERROR NOW)
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  //  CREATE USER
  const createUser = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users", form);

      setShowForm(false);

      setForm({
        name: "",
        email: "",
        password: "",
        role: "user",
        status: "active",
      });

      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating user");
    }
  };

  //  DELETE USER
  const deleteUser = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting user");
    }
  };

  //  BLOCK NORMAL USER (AFTER HOOKS)
  if (role === "user") {
    return (
      <div>
        <Navbar />
        <h2 className="text-center mt-10 text-xl text-red-500">
          Access Denied
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Navbar />

      <h1 className="text-2xl font-bold mt-4">Users</h1>

      {/* 🔍 SEARCH */}
      <input
        className="border p-2 mt-4 w-1/3 rounded"
        placeholder="Search users..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/*  CREATE BUTTON (ADMIN ONLY) */}
      {role === "admin" && (
        <button
          onClick={() => setShowForm(true)}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Create User
        </button>
      )}

      {/*  CREATE FORM */}
      {showForm && role === "admin" && (
        <form
          onSubmit={createUser}
          className="bg-white p-4 mt-4 rounded shadow w-1/2"
        >
          <input
            className="border p-2 w-full mb-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="border p-2 w-full mb-2"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="border p-2 w-full mb-2"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            className="border p-2 w-full mb-2"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

          <select
            className="border p-2 w-full mb-2"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Create
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      )}

      {/*  TABLE */}
      <div className="mt-6 bg-white shadow rounded">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Updated By</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
                <td>{u.createdBy?.name || "—"}</td>
                <td>{u.updatedBy?.name || "—"}</td>
                <td>{new Date(u.createdAt).toLocaleString()}</td>
                <td>{new Date(u.updatedAt).toLocaleString()}</td>

                <td>
                  {(
                    role === "admin" ||
                    (role === "manager" && u.role !== "admin")
                  ) && (
                      <button
                        onClick={() => setEditUser(u)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                    )}

                  {role === "admin" && (
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editUser && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                await API.put(`/users/${editUser._id}`, editUser);

                alert("User updated");

                setEditUser(null);
                fetchUsers();
              } catch (err) {
                alert(err.response?.data?.message || "Update failed");
              }
            }}
            className="bg-yellow-100 p-4 mt-4 rounded shadow w-1/2"
          >
            <h3 className="font-bold mb-3">Edit User</h3>

            {/* NAME */}
            <input
              className="border p-2 w-full mb-2"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
              placeholder="Name"
            />

            {/* EMAIL (READ ONLY FOR MANAGER) */}
            {role === "admin" ? (
              <input
                className="border p-2 w-full mb-2"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                placeholder="Email"
              />
            ) : (
              <input
                className="border p-2 w-full mb-2 bg-gray-100"
                value={editUser.email}
                disabled
              />
            )}

            {/* ROLE (ADMIN ONLY) */}
            {role === "admin" && (
              <select
                className="border p-2 w-full mb-2"
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            )}

            {/* STATUS */}
            <select
              className="border p-2 w-full mb-2"
              value={editUser.status}
              onChange={(e) =>
                setEditUser({ ...editUser, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* BUTTONS */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Update
            </button>

            <button
              type="button"
              onClick={() => setEditUser(null)}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {/*  PAGINATION */}
      <div className="mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Prev
        </button>

        <span className="mx-4">Page {page}</span>

        <button
          onClick={() => setPage(page + 1)}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}