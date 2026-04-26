// HowItWorks.jsx

const STEPS = [
  {
    num: "01",
    title: "Create Your Presence",
    desc: "Set up your profile with your work, interests, and goals — so others know what you actually build.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Discover the Right People",
    desc: "Explore developers aligned with your mindset and goals no randomness, just relevance.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Start the Conversation",
    desc: "Reach out, chat, or jump into discussions that move ideas forward.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Build Something Real",
    desc: "Collaborate on projects, share progress, and turn ideas into shipped work.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <div className="hiw" id="hiw">
      <div className="hiw-inner">
        {/* Header */}
        <div className="hiw-head">
          <div className="sec-label reveal" style={{ textAlign: "center" }}>
            Process
          </div>
          <h2 className="sec-title reveal d1" style={{ textAlign: "center" }}>
            How Builders Connect & Ship
          </h2>
          <p
            className="reveal d2"
            style={{ fontSize: 15, color: "var(--text2)", marginTop: 10 }}
          >
            From discovery to collaboration — without the noise.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline">
          {STEPS.map((step, i) => (
            <div key={step.num} className={`ts reveal d${i}`}>
              <div className="ts-icon">{step.icon}</div>
              <div>
                <div className="ts-label">Step {step.num}</div>
                <div className="ts-title">{step.title}</div>
                <div className="ts-desc">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
