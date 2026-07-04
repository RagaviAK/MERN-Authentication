import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { AppContent } from "../context/AuthContext";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { backend } = useContext(AppContent);

  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    unverifiedUsers: 0,
    activeSessions: 0,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    try {
      const { data } = await axios.get(backend + "api/admin/users");

      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const updateRole = async () => {
  try {
    const { data } = await axios.patch(
      backend + `api/admin/users/${selectedUser._id}/role`,
      {
        role: selectedRole,
      }
    );

    if (data.success) {
      toast.success(data.message);

      setSelectedUser(null);

      getUsers();

      getDashboard();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

  const getDashboard = async () => {
    try {
      setLoading(true);

      axios.defaults.withCredentials = true;

      const { data } = await axios.get(backend + "api/admin/dashboard");

      if (data.success) {
        setDashboard(data.dashboard);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
    getUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-semibold">Loading Dashboard...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-28 px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-2">Welcome to your admin panel</p>
          </div>

          <button
            onClick={getDashboard}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500">Total Users</p>

            <h2 className="text-4xl font-bold mt-3">{dashboard.totalUsers}</h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500">Verified Users</p>

            <h2 className="text-4xl font-bold mt-3 text-green-600">
              {dashboard.verifiedUsers}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500">Unverified Users</p>

            <h2 className="text-4xl font-bold mt-3 text-yellow-600">
              {dashboard.unverifiedUsers}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500">Active Sessions</p>

            <h2 className="text-4xl font-bold mt-3 text-blue-600">
              {dashboard.activeSessions}
            </h2>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-5">User Management</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="py-3">Name</th>

                  <th>Email</th>

                  <th>Role</th>

                  <th>Verified</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="py-4">{user.name}</td>

                    <td>{user.email}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          user.role === "admin" ? "bg-red-500" : "bg-blue-500"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>{user.isVerified ? "✅" : "❌"}</td>

                    <td>
                      <button
  onClick={() => {
    setSelectedUser(user);
    setSelectedRole(user.role);
  }}
  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
>
  Change Role
</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedUser && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

    <div className="bg-white rounded-xl p-6 w-96">

      <h2 className="text-2xl font-bold mb-4">
        Change Role
      </h2>

      <p className="mb-4">
        {selectedUser.name}
      </p>

      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        className="w-full border rounded-lg p-3"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setSelectedUser(null)}
          className="px-5 py-2 border rounded-lg"
        >
          Cancel
        </button>

       <button
  onClick={updateRole}
  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
>
  Save
</button>

      </div>

    </div>

  </div>
)}
    </div>
    
    
  );
};

export default AdminDashboard;
