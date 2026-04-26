// Hero.jsx
import { useRef } from "react";

const COMMANDS = {
  help: ["Available commands: match, explore, hubs, profile, connect"],
  match: [
    "→ Searching your stack...",
    "✓ Found 12 matches: React + Node.js devs near you",
  ],
  explore: [
    "→ Loading Idea Marketplace...",
    "✓ 47 open collaboration calls found",
  ],
  hubs: [
    "→ AI Builders Hub (1.2k)",
    "→ Web3 Collective (890)",
    "→ Open Source Guild (3.4k)",
  ],
  profile: [
    "→ Profile: @you — 85% complete",
    "⚠ Add GitHub to boost visibility",
  ],
  connect: [
    "→ Opening connection panel...",
    "✓ 3 pending requests awaiting you",
  ],
};

export default function Hero() {
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key !== "Enter") return;
    const val = inputRef.current.value.trim().toLowerCase();
    inputRef.current.value = "";
    if (!val) return;

    const lines = COMMANDS[val] || [
      '✗ Unknown command. Type "help" for options.',
    ];
    lines.forEach((msg, i) => {
      setTimeout(() => {
        const div = document.createElement("div");
        div.className = "tl";
        div.innerHTML = msg
          .replace(/^✓/, '<span class="ok">✓</span>')
          .replace(/^→/, '<span class="acc">→</span>');
        const promptRow = inputRef.current.parentElement;
        bodyRef.current.insertBefore(div, promptRow);
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }, i * 110);
    });
  };

  return (
    <section className="hero">
      {/* Badge */}
      <div className="hero-badge">
        <div className="dot" />
        Connect with Minds That Build
      </div>

      {/* Title */}
      <h1 className="hero-title reveal">
        Connect with <em>real builders</em>,<br />
        <span className="dim">not just followers.</span>
      </h1>

      {/* Subtitle */}
      <p className="hero-sub reveal d1">
        DevAgora brings <strong>developers who ship</strong> together — through
        intelligent matching, open collaboration, and a community built on code.
      </p>

      {/* CTA Buttons */}
      <div className="hero-btns reveal d2">
        <button className="btn-doc">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          Explore <span id='explore'>DevAgora</span>
        </button>
        <button className="btn-npm">
          <span className="npm-a">$</span>&nbsp;<span id='explore'>devagora</span> --join
        </button>
      </div>

      {/* Terminal */}
      <div className="terminal reveal d3">
        <div className="term-bar">
          <div className="td td-r" />
          <div className="td td-y" />
          <div className="td td-g" />
          <span className="term-title">DevAgora Terminal</span>
        </div>
        <div className="term-body" ref={bodyRef}>
          <div className="tl">
            <span className="acc">→</span> Connected to <span className="acc">DevAgora</span> network
          </div>
          <div className="tl">
            <span className="ok">✓</span> Finding builders for your profile
          </div>
          <div className="tl">
            <span className="ok">✓</span> Found{" "}
            <span className="acc">developers</span> matching your profile
          </div>
          <div className="tl">
            <span className="ok">✓</span> Collaboration opportunities open
          </div>
          <div className="term-prompt-row">
            <span className="term-prompt">›</span>
            <input
              ref={inputRef}
              className="term-input"
              placeholder="Type 'help' to see commands..."
              onKeyDown={handleCommand}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
