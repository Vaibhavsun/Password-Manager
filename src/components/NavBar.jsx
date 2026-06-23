import {Link} from 'react-router'
function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-2 text-xl font-semibold text-emerald-700">
          <span>🔐</span>
          <span>MintLock</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-sm text-emerald-700">
          <a href="#features" className="hover:text-emerald-900 transition">
            Features
          </a>
          <a href="#security" className="hover:text-emerald-900 transition">
            Security
          </a>
          <a href="#pricing" className="hover:text-emerald-900 transition">
            Pricing
          </a>
        </div>

        {/* CTA */}
        <Link to='/Home'><button className="bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition hover:cursor-pointer">
          Login
        </button></Link>


      </div>
    </nav>
  );
}

export default Navbar;
