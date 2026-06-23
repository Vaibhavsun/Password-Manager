import React from 'react'
import { Link } from 'react-router-dom'
function HeroSection() {
  return (
    <div>
    <section className="min-h-screen flex flex-col justify-center items-center bg-emerald-50 text-center px-6">
      <h1 className="text-5xl font-bold text-emerald-900">
          Secure Your Passwords.
      </h1>

      <p className="mt-4 text-xl text-emerald-600 max-w-xl">
          Access Them Anywhere.
      </p>
      <Link to='/Home'>
      <button className="mt-8 bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition hover:cursor-pointer">
        Explore Ideas
      </button>
      </Link>
    </section>
    </div>
  )
}

export default HeroSection