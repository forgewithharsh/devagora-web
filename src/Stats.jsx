// Stats.jsx

const STATS = [
  { num: "12", suffix: "k+", label: "Active Builders" },
  { num: "4", suffix: ".2k", label: "Projects Shipped" },
  { num: "98", suffix: "%", label: "Match Quality" },
  { num: "30", suffix: "+", label: "Tech Hubs" },
];

export default function Stats() {
  return (
    <div className="stats-strip">
      {STATS.map((s, i) => (
        <div key={s.label} className={`stat reveal d${i + 1}`}>
          <div className="stat-n">
            {s.num}
            <em>{s.suffix}</em>
          </div>
          <div className="stat-l">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
