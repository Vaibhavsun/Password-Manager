import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ValidateSession from "./utils/ValidateSession";
import GetUser from "./utils/GetUser";
import SearchConfidence from "./utils/SearchConfidence";
import PopUp from "./components/Password-PopUp";

function Home() {
  const navigate = useNavigate();
  const loading = ValidateSession();

  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [SearchTaggings, setSearchTagging] = useState([]);
  const [SelectedUser, setSelectedUser] = useState(null);

  const inpRef = useRef(null);

  const closPop = () => {
    setSelectedUser(null);
    setSearchQuery("");
    if (inpRef.current) {
      inpRef.current.value = "";
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await GetUser();
      setUser(userData.username);
    };

    if (!loading) {
      fetchUser();
    }
  }, [loading]);

  useEffect(() => {
    const loadST = async () => {
      const res = await fetch(
        "http://localhost:3000/auth/get-search-tags",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setSearchTagging(data.searchTags);
    };

    loadST();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setFilteredResults([]);
      } else {
        setFilteredResults(
          SearchConfidence(SearchTaggings, searchQuery)
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [searchQuery, SearchTaggings]);

  if (loading) return null;

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/Auth");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      {SelectedUser && (
        <PopUp UserObj={SelectedUser} onClose={closPop} />
      )}

      <div
        className="min-h-screen relative flex items-center justify-center overflow-hidden px-4"
        style={{
          background:
            "linear-gradient(120deg, #ecfdf5, #d1fae5, #ecfdf5)",
          backgroundSize: "200% 200%",
          animation: "gradientMove 20s ease infinite",
        }}
      >
        {/* Floating circles */}
        <div
          className="absolute top-20 left-20 w-72 h-72 rounded-full border-2 border-blue-400 opacity-40"
          style={{ animation: "floatSlow 18s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-24 right-24 w-96 h-96 rounded-full border-2 border-orange-400 opacity-30"
          style={{ animation: "floatReverse 22s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full border border-orange-300 opacity-25"
          style={{ animation: "floatSlow 14s ease-in-out infinite" }}
        />

        {/* Main content */}
        <div className="relative z-10 w-full max-w-3xl text-center">
          <p className="text-lg md:text-xl text-emerald-600 mb-3">
            Welcome {user} 👋
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-emerald-900 mb-6">
            Find your password
          </h1>

          <p className="text-xl md:text-2xl text-emerald-700 mb-10">
            Search by app name, website, or email
          </p>

          {/* Search */}
          <div className="relative w-full mt-6 mx-auto">
            <div className="relative bg-white rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-gray-200">
              <input
                ref={inpRef}
                type="text"
                placeholder="Search Google, github.com, you@email.com"
                className="w-full h-[60px] px-6 text-xl rounded-t-2xl outline-none border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
              />

              {searchQuery &&
                filteredResults.length > 0 && (
                  <ul className="absolute left-0 right-0 top-full bg-white border border-gray-200 rounded-b-2xl shadow-lg max-h-60 overflow-y-auto z-40">
                    {filteredResults.map((item) => (
                      <li
                        key={item.id}
                        onClick={() =>
                          setSelectedUser(item)
                        }
                        className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                      >
                        {item.websiteorApp} -{" "}
                        {item.emailorUsername}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-3 relative z-10">
            <button
              onClick={() => navigate("/my-passwords")}
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-blue-600 transition cursor-pointer"
            >
              My Passwords
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-red-600 transition cursor-pointer"
            >
              Logout
            </button>

            <button
              onClick={() =>
                navigate("/add-password")
              }
              className="bg-emerald-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-emerald-600 transition cursor-pointer"
            >
              + Add New Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;