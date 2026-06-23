import {useForm} from "react-hook-form"
import {object,string} from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState,useEffect} from "react"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom"

const schema = object({
    email:string().required("This is Required").email("Enter a valid email"),
    password:string().required("This is Required").min(6,"Password must be at least 6 characters long"),
}
)

export default function AuthCard(props){

    const navigate = useNavigate();
    const [signIn,setSignIn] = useState(props)

    async function onSumbit(data){

        const url = signIn ? "http://localhost:3000/auth/login" : "http://localhost:3000/auth/register";
        const method = signIn ? "Login" : "Registration";
        const res = await fetch(url,{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        if (res.status !== 201 && res.status !== 200) {
            return toast.error(`${method} Failed`)
        }
        else{
            toast.success(`${method} Successful`)
            navigate("/Home");
        }
    }
    const {register,formState:{errors},handleSubmit,noValidate,reset} = useForm({resolver:yupResolver(schema)})
    return  <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg px-6 py-15">
        <h2 className="text-2xl font-semibold text-center mb-15">
        {signIn ? "Sign In" : "Sign Up"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSumbit)} noValidate>
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
                {...register("password")}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-red-500">{errors.password?.message}</p>

          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition hover:cursor-pointer"
          >
            {signIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          {signIn ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span className="text-green-600 cursor-pointer" onClick={() => { reset(); setSignIn(!signIn) ;}}>
            {signIn ? "Sign Up" : "Sign In"}{" "}
          </span>
        </p>
      </div>
    </div>
}

