// Seamless.jsx

const CODE_LINES = [
  { ln: 1, parts: [{ c: "ck", t: "const" }, { c: "ct", t: " devAgora = {" }] },
  { ln: 2, parts: [{ c: "ct", t: "  " }, { c: "ck", t: "mission:" }, { c: "ct", t: " " }, { c: "cs", t: '"Connect real builders"' }, { c: "ct", t: "," }] },
  { ln: 3, parts: [{ c: "ct", t: "  " }, { c: "ck", t: "stack:" }, { c: "ct", t: " " }, { c: "cs", t: '["React","Node","Go"]' }, { c: "ct", t: " ," }] },
  { ln: 4, parts: [{ c: "ct", t: "  " }, { c: "ck", t: "matching:" }, { c: "ct", t: " " }, { c: "cs", t: '"skill-based"' }, { c: "ct", t: " ," }] },
  { ln: 5, parts: [{ c: "ct", t: "  " }, { c: "ck", t: "community:" }, { c: "ct", t: " " }, { c: "cs", t: '"Chai Code Cohort"' }, { c: "ct", t: " ," }] },
  { ln: 6, parts: [{ c: "ct", t: "  " }, { c: "ck", t: "vibe:" }, { c: "ct", t: " " }, { c: "cs", t: '"build-not-chat"' }, { c: "ct", t: " ," }] },
  { ln: 7, parts: [{ c: "ct", t: "  " }, { c: "ck", t: "openSource:" }, { c: "ct", t: " " }, { c: "cd", t: "true" }] },
  { ln: 8, parts: [{ c: "ct", t: "};" }] },
];

export default function Seamless() {
  return (
    <div className="seamless">
      <div className="seamless-inner">
        {/* Left */}
        <div>
          <div className="s-label reveal">Platform</div>
          <h2 className="s-title reveal d1">
            Seamless Use of<br />
            <em>DevAgora</em>
          </h2>
          <p className="s-sub reveal d2">
            Built for developers who value depth over noise. <span id="explore">DevAgora</span> fits into your workflow — no bloat, no friction, just builders building together.
          </p>
        </div>

        {/* Code block */}
        <div className="code-block reveal d1">
          <div className="code-bar">
            <div className="td td-r" />
            <div className="td td-y" />
            <div className="td td-g" />
            <span className="term-title" style={{ marginLeft: 8 }}>
              devagora.config.js
            </span>
          </div>
          <div className="code-body">
            {CODE_LINES.map(({ ln, parts }) => (
              <div key={ln} className="cl">
                <span className="ln">{ln}</span>
                {parts.map((p, i) => (
                  <span key={i} className={p.c}>{p.t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
