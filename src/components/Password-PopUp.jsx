import React, { useState } from "react";

export default function PopUp({ UserObj, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  console.log("UserObh",UserObj)
  return (
    <div
      className={`fixed ${isOpen ? "flex" : "hidden"} inset-0 items-center justify-center bg-black/40 z-50`}
    >
      <div className="bg-white w-[420px] rounded-2xl shadow-xl border border-gray-200 p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
            setIsOpen(false);
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-lg cursor-pointer"
        >
          ✕
        </button>

        {/* Content */}

        <div className="space-y-4 text-sm">

          <div>
            <p className="text-gray-500">Application</p>
            <p className="font-medium text-gray-800">
              {UserObj.websiteorApp}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Username</p>
            <p className="font-medium text-gray-800">
              {UserObj.emailorUsername}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Password</p>
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-800">
                {showPassword ? UserObj.password : "••••••••"}
              </p>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-blue-600 text-xs hover:underline cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}