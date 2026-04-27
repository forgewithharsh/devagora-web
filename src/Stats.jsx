// Stats.jsx

const STATS = [
  { num: "1", suffix: "+", label: "Active Builders" },
  { num: "1", suffix: "", label: "Projects Shipped" },
  { num: "98", suffix: "%", label: "Match Quality" },
  { num: "1", suffix: "+", label: "Tech Hubs" },
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
