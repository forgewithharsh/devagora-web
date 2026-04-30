import { useEffect, useRef } from "react";

export default function MeteorBg({ theme = "dark" }) {
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

    // THEME COLORS
    const isLight = theme === "light";

    const dotColor = isLight
      ? "rgba(60,60,60," // was too faint earlier
      : "rgba(242,237,232,";

    const meteorCore = isLight
      ? "rgba(255,140,80," // brighter warm orange
      : "rgba(232,135,74,";

    const meteorTail = isLight
      ? "rgba(255,255,255," // light glow tail
      : "rgba(242,237,232,";

    // Stars
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
      len: Math.random() * 100 + 50, // slightly shorter = cleaner
      speed: Math.random() * 3 + 2.5, // smoother
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
      alpha: isLight
        ? Math.random() * 0.4 + 0.6 // stronger in light mode
        : Math.random() * 0.6 + 0.3,
        width: isLight
  ? Math.random() * 2 + 1   // was too thin
  : Math.random() * 1.5 + 0.5,
      life: 0,
    });

    const meteors = Array.from({ length: 6 }, makeMeteor);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dots
      dots.forEach((d) => {
        d.pulse += 0.02;
        const opacity = d.o + Math.sin(d.pulse) * 0.15;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `${dotColor}${Math.max(0, opacity)})`;
        ctx.fill();
      });

      // Meteors
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

        grad.addColorStop(0, `${meteorCore}0)`);
grad.addColorStop(0.4, `${meteorCore}${m.alpha * 0.7})`);
grad.addColorStop(1, `${meteorTail}${m.alpha * 1.1})`);

        ctx.beginPath();
        ctx.moveTo(
          m.x + dx - Math.cos(m.angle) * m.len,
          m.y + dy - Math.sin(m.angle) * m.len,
        );
        ctx.lineTo(m.x + dx, m.y + dy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.shadowBlur = isLight ? 14 : 6;
ctx.shadowColor = isLight
  ? "rgba(255,140,80,0.7)"
  : "rgba(232,135,74,0.5)";
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
  }, [theme]);

  return <canvas ref={canvasRef} className="auth-canvas" />;
}
