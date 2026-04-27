// Signup.jsx
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
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

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

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((d) => {
        d.pulse += 0.02;
        const opacity = d.o + Math.sin(d.pulse) * 0.15;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242,237,232,${Math.max(0, opacity)})`;
        ctx.fill();
      });

      meteors.forEach((m, i) => {
        m.life += m.speed;
        const dx = Math.cos(m.angle) * m.life;
        const dy = Math.sin(m.angle) * m.life;
        const grad = ctx.createLinearGradient(
          m.x + dx - Math.cos(m.angle) * m.len,
          m.y + dy - Math.sin(m.angle) * m.len,
          m.x + dx, m.y + dy
        );
        grad.addColorStop(0, `rgba(232,135,74,0)`);
        grad.addColorStop(0.6, `rgba(232,135,74,${m.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(242,237,232,${m.alpha})`);
        ctx.beginPath();
        ctx.moveTo(m.x + dx - Math.cos(m.angle) * m.len, m.y + dy - Math.sin(m.angle) * m.len);
        ctx.lineTo(m.x + dx, m.y + dy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.stroke();
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

/* ── Signup Component ───────────────────────────────────────── */
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    password: "", gender: "", educationYear: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup →", form);
    // navigate("/dashboard");
  };

  return (
    <div className="auth-page auth-centered">
      <MeteorBg />

      {/* Back */}
      <button className="auth-back" onClick={() => navigate("/")}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back
      </button>

      <div className="auth-card signup-card">
        {/* Logo */}
        <div className="auth-logo" onClick={() => navigate("/")}>
          Dev<span>Agora</span>
        </div>

        <h1 className="auth-title" style={{ textAlign: "center", marginBottom: 8 }}>
          Join DevAgora
        </h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* First + Last */}
          <div className="field-row">
            <div className="field-group">
              <label className="field-label"><UserIcon /> First Name</label>
              <input className="field-input" type="text" name="firstName"
                placeholder="First Name" value={form.firstName}
                onChange={handleChange} required />
            </div>
            <div className="field-group">
              <label className="field-label"><UserIcon /> Last Name</label>
              <input className="field-input" type="text" name="lastName"
                placeholder="Last Name" value={form.lastName}
                onChange={handleChange} required />
            </div>
          </div>

          {/* Email */}
          <div className="field-group">
            <label className="field-label"><MailIcon /> Email</label>
            <input className="field-input" type="email" name="email"
              placeholder="Email" value={form.email}
              onChange={handleChange} required />
          </div>

          {/* Password */}
          <div className="field-group">
            <label className="field-label"><LockIcon /> Password</label>
            <div className="input-wrap">
              <input className="field-input" name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password" value={form.password}
                onChange={handleChange} required />
              <button type="button" className="eye-btn"
                onClick={() => setShowPassword((p) => !p)}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Gender */}
          <div className="field-group">
            <label className="field-label"><UserIcon /> Gender</label>
            <select className="field-input field-select" name="gender"
              value={form.gender} onChange={handleChange} required>
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
          </div>

          {/* Education Year */}
          <div className="field-group">
            <label className="field-label"><GraduationIcon /> Education Year</label>
            <select className="field-input field-select" name="educationYear"
              value={form.educationYear} onChange={handleChange} required>
              <option value="" disabled>Select Education Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              <option value="grad">Graduate</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button className="btn-submit" type="submit">Sign Up</button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">Login</Link>
        </p>
      </div>
    </div>
  );
}

/* ── Icons ─────────────────────────────────────────────────── */
function UserIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function MailIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
}
function LockIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
}
function GraduationIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
}
function EyeIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
}
function EyeOffIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>;
}
