import {
  MessageSquare,
  Lightbulb,
  UserCheck,
  Search,
  Users,
  MessagesSquare,
} from "lucide-react";

const FEATURES = [
  {
    icon: MessageSquare,
    num: "01",
    title: "Live Collaboration",
    desc: "Chat instantly to discuss ideas, unblock problems, and build together in real time.",
  },
  {
    icon: Lightbulb,
    num: "02",
    title: "Build Together",
    desc: "Share ideas or join ongoing projects. Find developers who are ready to collaborate and ship.",
  },
  {
    icon: UserCheck,
    num: "03",
    title: "Proof-Driven Profiles",
    desc: "Showcase your real work, projects, and contributions — so connections are based on what you’ve built.",
  },
  {
    icon: Search,
    num: "04",
    title: "Smart Discovery",
    desc: "Find developers aligned with your goals, experience, and availability — fast, relevant, and intentional.",
  },
  {
    icon: Users,
    num: "05",
    title: "Focused Communities",
    desc: "Join topic-based hubs where discussions lead to collaboration and ideas turn into real products.",
  },
  {
    icon: MessagesSquare,
    num: "06",
    title: "Meaningful Discussions",
    desc: "Engage in focused conversations that lead to real collaboration, not endless scrolling.",
  },
];

export default function Features() {
  return (
    <section className="feat-section" id="features">
      <div className="feat-header">
        <div className="sec-label reveal">Features</div>
        <h2 className="sec-title reveal d1">
          Everything you need to <em>ship together</em>
        </h2>
      </div>

      <div className="feat-grid">
        {FEATURES.map((f, i) => {
          const Icon = f.icon; // ✅ important

          return (
            <div key={f.num} className={`fc reveal d${i + 1}`}>
              <div className="fc-icon">
                <Icon className="w-5 h-5" /> {/* ✅ correct render */}
              </div>
              <div className="fc-num">{f.num}</div>
              <div className="fc-title">{f.title}</div>
              <div className="fc-desc">{f.desc}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
