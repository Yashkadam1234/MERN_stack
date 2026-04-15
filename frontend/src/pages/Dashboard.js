import Navbar from "../components/Navbar";

export default function Dashboard() {
  const role = localStorage.getItem("role");

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500">Role</h2>
            <p className="text-xl font-bold">{role}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500">System</h2>
            <p className="text-xl font-bold">Active</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500">Access</h2>
            <p className="text-xl font-bold">RBAC Enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
}