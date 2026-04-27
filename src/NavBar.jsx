// Navbar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <a href="/" className="nav-logo">
        Dev<span>Agora</span>
      </a>

      {/* Nav Links */}
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#hiw">How it Works</a>
        <a href="#community">Community</a>
      </div>

      {/* Right Actions */}
      <div className="nav-right">
        {/* Theme Toggle */}
        <button className="btn-theme" onClick={toggleTheme} title="Toggle theme">
          {theme === "dark" ? (
            // Moon — shown in dark mode
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            // Sun — shown in light mode
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
              <line x1="12" y1="2"    x2="12" y2="5"    />
              <line x1="12" y1="19"   x2="12" y2="22"   />
              <line x1="2"  y1="12"   x2="5"  y2="12"   />
              <line x1="19" y1="12"   x2="22" y2="12"   />
              <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34"  />
              <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
              <line x1="19.78" y1="4.22"  x2="17.66" y2="6.34"  />
              <line x1="6.34"  y1="17.66" x2="4.22"  y2="19.78" />
            </svg>
          )}
        </button>

        {/* Get Started → navigates to /login */}
        <button className="btn-cta" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>
    </nav>
  );
}
