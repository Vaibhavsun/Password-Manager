import React from 'react'
import FeatureCard from './FeatureCard'
function Features() {
  return (
    <section id="features" className="py-32 bg-white">
  <h2 className="text-5xl font-bold text-center text-emerald-900">
    Features built for real life
  </h2>
  <p className="mt-6 text-xl text-center text-emerald-600">
    Everything you need. Nothing you don’t.
  </p>

  <div className="mt-16 grid gap-10 max-w-7xl mx-auto px-8 md:grid-cols-3">
    {[
      {
        title: "Encrypted Vault",
        desc: "All passwords are encrypted end-to-end before they ever leave your device."
      },
      {
        title: "Password Generator",
        desc: "Create strong, unique passwords instantly for every account."
      },
      {
        title: "Cross-Device Sync",
        desc: "Access your passwords securely across all your devices."
      }
    ].map((item, i) => (
      <FeatureCard
        key={i}
        title={item.title}
        desc={item.desc}
      />
    ))}
  </div>
</section>
  )
}

export default Features