// Login.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ── Meteor canvas background ───────────────────────────────── */
function MeteorBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Dots / stars
    const dots = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Meteors
    const makeMeteor = () => ({
      x: Math.random() * canvas.width * 1.5,
      y: -20,
      len: Math.random() * 120 + 60,
      speed: Math.random() * 4 + 3,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.3,
      width: Math.random() * 1.5 + 0.5,
      life: 0,
    });

    const meteors = Array.from({ length: 6 }, makeMeteor);

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Draw dots
      dots.forEach((d) => {
        d.pulse += 0.02;
        const opacity = d.o + Math.sin(d.pulse) * 0.15;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242,237,232,${Math.max(0, opacity)})`;
        ctx.fill();
      });

      // Draw meteors
      meteors.forEach((m, i) => {
        m.life += m.speed;
        const dx = Math.cos(m.angle) * m.life;
        const dy = Math.sin(m.angle) * m.life;

        const grad = ctx.createLinearGradient(
          m.x + dx - Math.cos(m.angle) * m.len,
          m.y + dy - Math.sin(m.angle) * m.len,
          m.x + dx,
          m.y + dy,
        );
        grad.addColorStop(0, `rgba(232,135,74,0)`);
        grad.addColorStop(0.6, `rgba(232,135,74,${m.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(242,237,232,${m.alpha})`);

        ctx.beginPath();
        ctx.moveTo(
          m.x + dx - Math.cos(m.angle) * m.len,
          m.y + dy - Math.sin(m.angle) * m.len,
        );
        ctx.lineTo(m.x + dx, m.y + dy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.stroke();

        // Reset when off screen
        if (m.x + dx > canvas.width + 100 || m.y + dy > canvas.height + 100) {
          meteors[i] = { ...makeMeteor(), x: Math.random() * canvas.width };
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="auth-canvas" />;
}

/* ── Login Component ────────────────────────────────────────── */
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login →", form);
    // navigate("/dashboard");
  };

  return (
    <div className="auth-page auth-centered">
      <MeteorBg />

      {/* Back to home */}
      <button className="auth-back" onClick={() => navigate("/")}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back
      </button>

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo" onClick={() => navigate("/")}>
          Dev<span>Agora</span>
        </div>

        {/* Heading */}
        <div className="auth-heading">
          <h1 className="auth-title">Get Started Now</h1>
          <p className="auth-sub">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Google */}
        <button className="btn-google" type="button">
          <GoogleIcon />
          Login with Google
        </button>

        {/* Divider */}
        <div className="auth-divider">
          <span />
          <p>OR</p>
          <span />
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label">
              <MailIcon /> Email Address
            </label>
            <input
              className="field-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label">
              <LockIcon /> Password
            </label>
            <div className="input-wrap">
              <input
                className="field-input"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button className="btn-submit" type="submit">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ── Icons ─────────────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.7 2.2 30.2 0 24 0 14.7 0 6.7 5.4 2.8 13.3l7.9 6.1C12.6 13 17.9 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.5 2.8-2.1 5.1-4.5 6.7l7 5.4C43.3 37 46.5 31.2 46.5 24.5z"
      />
      <path
        fill="#FBBC05"
        d="M10.7 28.6A14.6 14.6 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6L2.4 13.3A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.8 10.7l7.9-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.2 0 11.4-2 15.2-5.5l-7-5.4c-2.1 1.4-4.8 2.3-8.2 2.3-6.1 0-11.4-3.5-13.3-8.8l-7.9 6.1C6.7 42.6 14.7 48 24 48z"
      />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}
