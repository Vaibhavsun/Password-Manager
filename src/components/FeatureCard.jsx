import React from 'react'

function FeatureCard(props) {
  return (
        <div
        key={props.index}
        className="bg-emerald-50 rounded-3xl p-8 shadow-md hover:shadow-lg transition"
      >
        <h3 className="text-2xl font-semibold text-emerald-800">
          {props.title}
        </h3>
        <p className="mt-4 text-base text-emerald-600 leading-relaxed">
          {props.desc}
        </p>
      </div>

  )
}

export default FeatureCard