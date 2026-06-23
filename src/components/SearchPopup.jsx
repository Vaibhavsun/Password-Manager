import React from "react";

function SearchPopup({ results, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-start justify-center z-50"
      onClick={onClose}
    >
      <div
        className="mt-24 w-11/12 max-w-xl bg-white rounded-xl shadow-lg p-6 animate-slideDown"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="text-xl font-semibold mb-4 text-emerald-800">
          Search Results
        </h2>
        {results.length === 0 ? (
          <p className="text-gray-500">No results found</p>
        ) : (
          <ul>
            {results.map((item, idx) => (
              <li
                key={idx}
                className="py-2 px-3 rounded hover:bg-emerald-100 cursor-pointer transition"
              >
                {item.appName} - {item.website} - {item.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchPopup;