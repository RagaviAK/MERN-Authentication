import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { AppContent } from "../context/AuthContext";
import { toast } from "react-toastify";

const AuditLogs = () => {
  const { backend } = useContext(AppContent);

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuditLogs = async () => {
    try {
      const { data } = await axios.get(
        backend + "api/admin/audit-logs"
      );

      if (data.success) {
        setLogs(data.logs);
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
    getAuditLogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Audit Logs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-28 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Audit Logs
        </h1>

        <div className="bg-white rounded-xl shadow-md overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">Performed By</th>

                <th className="p-4 text-left">Target User</th>

                <th className="p-4 text-left">Action</th>

                <th className="p-4 text-left">Details</th>

                <th className="p-4 text-left">IP</th>

                <th className="p-4 text-left">Time</th>

              </tr>

            </thead>

            <tbody>

              {logs.map((log) => (

                <tr
                  key={log._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {log.performedBy?.name}
                  </td>

                  <td className="p-4">
                    {log.targetUser?.name}
                  </td>

                  <td className="p-4 font-semibold">
                    {log.action}
                  </td>

                  <td className="p-4">
                    {log.details}
                  </td>

                  <td className="p-4">
                    {log.ipAddress}
                  </td>

                  <td className="p-4">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default AuditLogs;