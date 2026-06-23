import React, { useState, useEffect } from "react";
import ValidateSession from "./utils/ValidateSession";
import toast from "react-hot-toast";

function MyPasswords() {
  const [visibleId, setVisibleId] = useState(null);
  const [passwords, setPasswords] = useState([]);


  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const result = await fetch(
          "http://localhost:3000/add-password-api/get-passwords",
          {
            method: "GET",
            credentials: "include"
          }
        );

        if (!result.ok) {
          console.error("Failed to fetch passwords");
          return;
        }

        const data = await result.json();
        setPasswords(data.passwords || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPasswords();
  }, []);



  const handleDelete = async (id) => {
    try {
      const result = await fetch(
        `http://localhost:3000/add-password-api/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      if (!result.ok) {
        toast.error("Failed to delete password");
        console.error("Failed to delete password");
        return;
      }
      toast.success("Password deleted successfully");
      // remove from state instantly
      setPasswords(prev => prev.filter(item => item._id !== id));

    } catch (err) {
      console.error(err);
    }
  };
  const loading = ValidateSession();
  if (loading) return null;
  return (
    <div
      className="min-h-screen relative px-6 py-12"
      style={{
        background: "linear-gradient(120deg, #ecfdf5, #d1fae5, #ecfdf5)",
        backgroundSize: "200% 200%",
        animation: "gradientMove 20s ease infinite",
      }}
    >
      <h1 className="text-3xl font-bold text-emerald-900 mb-10 text-center">
        My Passwords
      </h1>

      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {passwords.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">
            No passwords saved yet. Start adding some!
          </p>
        ) : (
          passwords.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-emerald-800">
                  {item.websiteorApp}
                </h3>

                <p className="text-xs text-gray-600 mt-1">
                  {item.emailorUsername}
                </p>

                <p className="text-sm text-gray-800 mt-3 tracking-wider">
                  {visibleId === item._id
                    ? item.password
                    : "••••••••"}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() =>
                    setVisibleId(
                      visibleId === item._id ? null : item._id
                    )
                  }
                  className="text-xs font-medium text-emerald-600 hover:text-emerald-800 cursor-pointer"
                >
                  {visibleId === item._id ? "Hide" : "Show"}
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-xs font-medium text-red-600 hover:text-red-800 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyPasswords;