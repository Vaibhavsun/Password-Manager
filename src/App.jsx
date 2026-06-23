import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthCard from './components/AuthCard'
import Navbar from './components/NavBar'
import HeroSection from './components/HeroSection'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Security from './components/Security'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Features/>
    <Pricing/>
    <Security/>
    </>
  )
}

export default App
