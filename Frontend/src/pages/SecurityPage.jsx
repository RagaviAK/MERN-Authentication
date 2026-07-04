import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContent } from "../context/AuthContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const SecurityPage = () => {
  axios.defaults.withCredentials = true;

  const { backend } = useContext(AppContent);

  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState("");
  const [loading, setLoading] = useState(true);

  const getSessions = async () => {
    try {
      const { data } = await axios.get(backend + "api/session");

      if (data.success) {
        setSessions(data.sessions);
        setCurrentSessionId(data.currentSessionId);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const logoutSession = async (sessionId) => {
    try {
      const { data } = await axios.delete(backend + "api/session/" + sessionId);

      if (data.success) {
        toast.success(data.message);
        getSessions();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logoutAllOtherDevices = async () => {
    try {
      const { data } = await axios.delete(backend + "api/session");

      if (data.success) {
        toast.success(data.message);
        getSessions();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getSessions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl">
        Loading Sessions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-32 px-5">
        <h1 className="text-4xl font-bold mb-8 text-center">Active Devices</h1>

        {sessions.length === 0 ? (
          <p className="text-center text-gray-500">No Active Sessions</p>
        ) : (
          sessions.map((session) => (
            <div
              key={session._id}
              className="bg-white rounded-xl shadow-md p-5 mb-5"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">
                    {session.deviceName}
                  </h2>

                  <p className="text-gray-600">
                    Browser : {session.browserName}
                  </p>

                  <p className="text-gray-600">
                    Login : {new Date(session.loginTime).toLocaleString()}
                  </p>

                  <p className="text-gray-600">
                    Last Active :{" "}
                    {new Date(session.lastActive).toLocaleString()}
                  </p>
                </div>

                {session._id === currentSessionId ? (
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full">
                    Current Device
                  </span>
                ) : (
                  <button
                    onClick={() => logoutSession(session._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          ))
        )}
        {sessions.length > 1 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={logoutAllOtherDevices}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md"
            >
              Logout All Other Devices
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityPage;
