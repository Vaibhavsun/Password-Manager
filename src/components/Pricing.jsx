import React from 'react'

function Pricing() {
  return (
    <section id="pricing" className="py-40 bg-white">
  <h2 className="text-6xl font-bold text-center text-emerald-900">
    Simple, transparent pricing
  </h2>

  <p className="mt-8 text-2xl text-center text-emerald-600 max-w-3xl mx-auto">
    Choose a plan that fits your needs. No hidden fees.
  </p>

  <div className="mt-20 grid gap-12 max-w-6xl mx-auto px-10 md:grid-cols-3">
    {[
      {
        plan: "Free",
        price: "$0",
        features: [
          "Unlimited passwords",
          "Single device access",
          "Standard encryption"
        ]
      },
      {
        plan: "Pro",
        price: "$3 / month",
        features: [
          "Unlimited devices",
          "Password sharing",
          "Priority updates"
        ]
      },
      {
        plan: "Family",
        price: "$6 / month",
        features: [
          "Up to 5 users",
          "Shared vaults",
          "Premium support"
        ]
      }
    ].map((p, i) => (
      <div
        key={i}
        className="rounded-3xl border border-emerald-100 p-10 text-center hover:shadow-2xl transition"
      >
        <h3 className="text-2xl font-semibold text-emerald-800">
          {p.plan}
        </h3>

        <p className="mt-6 text-5xl font-bold text-emerald-900">
          {p.price}
        </p>

        <ul className="mt-8 space-y-4 text-lg text-emerald-600">
          {p.features.map((f, idx) => (
            <li key={idx}>{f}</li>
          ))}
        </ul>

        <button className="mt-10 bg-emerald-500 text-white px-8 py-4 rounded-2xl text-lg hover:bg-emerald-600 transition">
          Choose Plan
        </button>
      </div>
    ))}
  </div>
</section>
  )
}

export default Pricing