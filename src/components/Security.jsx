import React from 'react'

function Security() {
  return (
    <section id="security" className="py-40 bg-emerald-50">
  <h2 className="text-6xl font-bold text-center text-emerald-900">
    Security you can trust
  </h2>

  <p className="mt-8 text-2xl text-center text-emerald-700 max-w-4xl mx-auto leading-relaxed">
    Built with zero-knowledge architecture and industry-grade encryption,
    so only you can access your data.
  </p>

  <div className="mt-20 grid gap-12 max-w-7xl mx-auto px-10 md:grid-cols-3">
    {[
      {
        title: "Zero-Knowledge Architecture",
        desc: "Your passwords are encrypted on your device. We never see, store, or access your data."
      },
      {
        title: "AES-256 Encryption",
        desc: "Bank-level encryption trusted by security professionals worldwide."
      },
      {
        title: "Biometric Protection",
        desc: "Secure your vault with fingerprint or face authentication on supported devices."
      }
    ].map((item, i) => (
      <div
        key={i}
        className="bg-white rounded-3xl p-10 shadow-xl"
      >
        <h3 className="text-2xl font-semibold text-emerald-800">
          {item.title}
        </h3>
        <p className="mt-5 text-lg text-emerald-600 leading-relaxed">
          {item.desc}
        </p>
      </div>
    ))}
  </div>
</section>
  )
}

export default Security