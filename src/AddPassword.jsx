import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import ValidateSession from "./utils/ValidateSession";


function AddPassword() {
    
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const loading = ValidateSession();
  if (loading) return null;


  
  const onSubmit = async (data) => {
    const res = await fetch("http://localhost:3000/add-password-api/add", {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (result.same){
        toast.error("Password for this website/app already exists");
        return;
    }
    console.log(data);
    if (res.status === 201) {
        toast.success("Password Added Successfully");
        navigate("/my-passwords");
    } else {
        toast.error("Failed to Add Password");
    }

  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center overflow-hidden px-4"
      style={{
        background: "linear-gradient(120deg, #ecfdf5, #d1fae5, #ecfdf5)",
        backgroundSize: "200% 200%",
        animation: "gradientMove 20s ease infinite",
      }}
    >
      {/* Background Circles */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-blue-400 opacity-30" />
      <div className="absolute bottom-24 right-24 w-80 h-80 rounded-full border border-orange-400 opacity-25" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-emerald-900 text-center mb-5">
            Add Password
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Website */}
            <div>
              <input
                type="text"
                placeholder="Website / App"
                {...register("websiteorApp", { required: true })}
                className="w-full rounded-xl px-4 py-2.5 text-sm border border-gray-200 shadow-sm focus:outline-none focus:border-emerald-400 focus:shadow-md transition-all"
              />
              {errors.websiteorApp && (
                <p className="text-red-500 text-xs mt-1">{errors.websiteorApp.message}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <input
                type="text"
                placeholder="Username / Email"
                {...register("emailorUsername", { required: "Required" })}
                className="w-full rounded-xl px-4 py-2.5 text-sm border border-gray-200 shadow-sm focus:outline-none focus:border-emerald-400 focus:shadow-md transition-all"
              />
              {errors.emailorUsername && (
                <p className="text-red-500 text-xs mt-1">{errors.emailorUsername.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Required",
                    minLength: { value: 8, message: "Min 8 chars" }
                  })}
                  className="w-full rounded-xl px-4 py-2.5 text-sm border border-gray-200 shadow-sm focus:outline-none focus:border-emerald-400 focus:shadow-md transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 text-xs hover:cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Notes */}
            <textarea
              rows="2"
              placeholder="Notes (optional)"
              {...register("Notes")}
              className="w-full rounded-xl px-4 py-2 text-sm border border-gray-200 shadow-sm focus:outline-none focus:border-emerald-400 focus:shadow-md transition-all resize-none"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-600 shadow-md hover:shadow-lg transition-all hover:cursor-pointer"
            >
              Save
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPassword;