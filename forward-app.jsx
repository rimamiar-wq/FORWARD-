import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0D1B2A",
  card: "#162534",
  border: "#1E3A4F",
  accent: "#00C9A7",
  accentDim: "#0A3D2E",
  white: "#FFFFFF",
  muted: "#8EAFC2",
  muted2: "#4A6A82",
};

const initialTasks = [
  { id: 1, title: "Complete Math Problem Set", desc: "Chapters 4-6, at least 20 problems", deadline: "2026-04-02", stake: 3, status: "active", reward: 0 },
  { id: 2, title: "Read Econ Article", desc: "Summarize key arguments in 200 words", deadline: "2026-04-01", stake: 2, status: "verified", reward: 0.5 },
];

const statusColors = {
  active: { bg: "#0A2A3D", text: "#5BB8E8", label: "Active" },
  pending: { bg: "#1A2A0A", text: "#8FCC3A", label: "Pending Review" },
  verified: { bg: "#0A3D2E", text: "#00C9A7", label: "Verified" },
  appealed: { bg: "#2A1A0A", text: "#E8A83A", label: "Appealed" },
};

function Badge({ status }) {
  const s = statusColors[status] || statusColors.active;
  return (
    <span style={{
      background: s.bg, color: s.text, fontSize: 11, fontWeight: 700,
      padding: "3px 10px", borderRadius: 20, letterSpacing: 0.5,
      fontFamily: "'DM Mono', monospace", textTransform: "uppercase"
    }}>{s.label}</span>
  );
}

function TaskCard({ task, onClick }) {
  const daysLeft = Math.ceil((new Date(task.deadline) - new Date()) / 86400000);
  return (
    <div onClick={() => onClick(task)} style={{
      background: COLORS.card, border: `1px solid ${COLORS.border}`,
      borderRadius: 12, padding: "18px 20px", cursor: "pointer",
      transition: "border-color 0.2s, transform 0.15s",
      marginBottom: 12,
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ color: COLORS.white, fontWeight: 600, fontSize: 15, fontFamily: "'DM Sans', sans-serif", flex: 1, marginRight: 12 }}>{task.title}</span>
        <Badge status={task.status} />
      </div>
      <p style={{ color: COLORS.muted, fontSize: 13, margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif" }}>{task.desc}</p>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <span style={{ color: COLORS.muted2, fontSize: 12, fontFamily: "'DM Mono', monospace" }}>
          {task.status === "verified" ? "Completed" : daysLeft < 0 ? "Overdue" : `${daysLeft}d left`}
        </span>
        <span style={{ color: COLORS.accent, fontSize: 13, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
          ${task.stake} stake
        </span>
        {task.status === "verified" && (
          <span style={{ color: "#8FCC3A", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>+${task.reward} bonus</span>
        )}
      </div>
    </div>
  );
}

function Navbar({ balance, streak, onNav, page }) {
  return (
    <div style={{
      background: COLORS.card, borderBottom: `1px solid ${COLORS.border}`,
      padding: "0 24px", height: 56, display: "flex", alignItems: "center",
      justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100
    }}>
      <span onClick={() => onNav("dashboard")} style={{
        color: COLORS.accent, fontWeight: 800, fontSize: 20,
        fontFamily: "'DM Sans', sans-serif", cursor: "pointer", letterSpacing: -0.5
      }}>Forward</span>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <span style={{ color: COLORS.muted, fontSize: 13, fontFamily: "'DM Mono', monospace" }}>
          🔥 {streak} day streak
        </span>
        <div style={{
          background: COLORS.accentDim, border: `1px solid ${COLORS.accent}`,
          borderRadius: 20, padding: "4px 14px", color: COLORS.accent,
          fontWeight: 700, fontSize: 13, fontFamily: "'DM Mono', monospace"
        }}>${balance.toFixed(2)}</div>
        <button onClick={() => onNav("new")} style={{
          background: COLORS.accent, color: COLORS.bg, border: "none",
          borderRadius: 8, padding: "7px 16px", fontWeight: 700, fontSize: 13,
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
        }}>+ New Task</button>
      </div>
    </div>
  );
}

function SignUp({ onSignUp, onBack }) {
  const [mode, setMode] = useState("signup"); // "signup" | "login"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = mode === "login" ? form.email && form.password : form.name && form.email && form.password;

  const inputStyle = {
    width: "100%", background: COLORS.card, border: `1px solid ${COLORS.border}`,
    borderRadius: 8, padding: "11px 14px", color: COLORS.white,
    fontFamily: "'DM Sans', sans-serif", fontSize: 14, boxSizing: "border-box",
    outline: "none",
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "24px 32px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif", padding: 0, marginRight: 20 }}>← Back</button>
        <span style={{ color: COLORS.accent, fontWeight: 800, fontSize: 22, fontFamily: "'DM Sans', sans-serif" }}>Forward</span>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: "40px 36px", width: "100%", maxWidth: 420 }}>
          <h2 style={{ color: COLORS.white, fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h2>
          <p style={{ color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", fontSize: 14, marginBottom: 28 }}>
            {mode === "signup" ? "Start holding yourself accountable." : "Sign in to continue your streak."}
          </p>

          <div style={{ display: "flex", background: COLORS.bg, borderRadius: 8, padding: 4, marginBottom: 28 }}>
            {["signup", "login"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: "8px 0", borderRadius: 6, border: "none",
                background: mode === m ? COLORS.accent : "transparent",
                color: mode === m ? COLORS.bg : COLORS.muted,
                fontWeight: 700, fontSize: 13, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s"
              }}>{m === "signup" ? "Sign Up" : "Log In"}</button>
            ))}
          </div>

          {mode === "signup" && (
            <div style={{ marginBottom: 18 }}>
              <label style={{ color: COLORS.muted, fontSize: 12, fontFamily: "'DM Mono', monospace", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Full Name</label>
              <input type="text" placeholder="Your name" value={form.name} onChange={e => set("name", e.target.value)} style={inputStyle} />
            </div>
          )}

          <div style={{ marginBottom: 18 }}>
            <label style={{ color: COLORS.muted, fontSize: 12, fontFamily: "'DM Mono', monospace", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Email</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={e => set("email", e.target.value)} style={inputStyle} />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ color: COLORS.muted, fontSize: 12, fontFamily: "'DM Mono', monospace", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Password</label>
            <input type="password" placeholder="••••••••" value={form.password} onChange={e => set("password", e.target.value)} style={inputStyle} />
          </div>

          <button onClick={() => valid && onSignUp(form)} style={{
            width: "100%", background: valid ? COLORS.accent : COLORS.border,
            color: valid ? COLORS.bg : COLORS.muted2, border: "none", borderRadius: 10,
            padding: "13px 0", fontWeight: 800, fontSize: 15,
            cursor: valid ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif"
          }}>
            {mode === "signup" ? "Create Account" : "Log In"}
          </button>

          <p style={{ textAlign: "center", color: COLORS.muted2, fontSize: 13, fontFamily: "'DM Sans', sans-serif", marginTop: 20 }}>
            {mode === "signup" ? "Already have an account? " : "Don't have an account? "}
            <span onClick={() => setMode(mode === "signup" ? "login" : "signup")} style={{ color: COLORS.accent, cursor: "pointer", fontWeight: 600 }}>
              {mode === "signup" ? "Log in" : "Sign up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Landing({ onStart, onSignUp }) {
  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "24px 32px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: COLORS.accent, fontWeight: 800, fontSize: 22, fontFamily: "'DM Sans', sans-serif" }}>Forward</span>
        <button onClick={onSignUp} style={{ background: "transparent", color: COLORS.accent, border: `1px solid ${COLORS.accent}`, borderRadius: 8, padding: "7px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Sign In</button>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", textAlign: "center" }}>
        <div style={{ background: COLORS.accentDim, border: `1px solid ${COLORS.accent}`, borderRadius: 20, padding: "6px 18px", marginBottom: 32, display: "inline-block" }}>
          <span style={{ color: COLORS.accent, fontSize: 12, fontWeight: 700, fontFamily: "'DM Mono', monospace", letterSpacing: 1 }}>SDG 4 — QUALITY EDUCATION</span>
        </div>
        <h1 style={{ color: COLORS.white, fontSize: 52, fontWeight: 800, fontFamily: "'DM Sans', sans-serif", margin: "0 0 20px", lineHeight: 1.1, maxWidth: 640 }}>
          Commit to your work.<br />
          <span style={{ color: COLORS.accent }}>Follow through.</span>
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 18, maxWidth: 480, margin: "0 0 48px", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
          Forward helps students close the gap between intention and action — without punishment, without judgment.
        </p>
        <div style={{ display: "flex", gap: 32, marginBottom: 56, flexWrap: "wrap", justifyContent: "center" }}>
          {[["Commit", "Set a task and a small stake"],["Complete", "Submit evidence when done"],["Earn", "Get your stake back plus a reward"]].map(([title, desc]) => (
            <div key={title} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "20px 24px", width: 180, textAlign: "left" }}>
              <div style={{ color: COLORS.accent, fontWeight: 800, fontSize: 16, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>{title}</div>
              <div style={{ color: COLORS.muted, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>{desc}</div>
            </div>
          ))}
        </div>
        <button onClick={onSignUp} style={{
          background: COLORS.accent, color: COLORS.bg, border: "none",
          borderRadius: 10, padding: "14px 40px", fontSize: 16, fontWeight: 800,
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: -0.3
        }}>Get Started — It's Free</button>
      </div>
    </div>
  );
}

function Dashboard({ tasks, onSelect, onNav, balance, streak }) {
  const active = tasks.filter(t => t.status === "active" || t.status === "pending");
  const completed = tasks.filter(t => t.status === "verified");
  return (
    <div style={{ padding: "28px 24px", maxWidth: 700, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 14, marginBottom: 32, flexWrap: "wrap" }}>
        {[
          { label: "Active Tasks", value: active.length, color: COLORS.accent },
          { label: "Completed", value: completed.length, color: "#8FCC3A" },
          { label: "Total Earned", value: `$${balance.toFixed(2)}`, color: "#5BB8E8" },
          { label: "Day Streak", value: `🔥 ${streak}`, color: "#E8A83A" },
        ].map(s => (
          <div key={s.label} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "16px 22px", flex: 1, minWidth: 130 }}>
            <div style={{ color: COLORS.muted, fontSize: 11, fontFamily: "'DM Mono', monospace", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: 24, fontWeight: 800, fontFamily: "'DM Sans', sans-serif" }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 28 }}>
        <h2 style={{ color: COLORS.white, fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Active Commitments</h2>
        {active.length === 0 ? (
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "36px 20px", textAlign: "center" }}>
            <div style={{ color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>No active tasks. Start your first commitment.</div>
            <button onClick={() => onNav("new")} style={{ background: COLORS.accent, color: COLORS.bg, border: "none", borderRadius: 8, padding: "9px 22px", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>+ New Task</button>
          </div>
        ) : active.map(t => <TaskCard key={t.id} task={t} onClick={onSelect} />)}
      </div>

      {completed.length > 0 && (
        <div>
          <h2 style={{ color: COLORS.white, fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Completed</h2>
          {completed.map(t => <TaskCard key={t.id} task={t} onClick={onSelect} />)}
        </div>
      )}
    </div>
  );
}

function NewTask({ onSave, onCancel }) {
  const [form, setForm] = useState({ title: "", desc: "", deadline: "", stake: 2 });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.title && form.deadline;

  const inputStyle = {
    width: "100%", background: COLORS.card, border: `1px solid ${COLORS.border}`,
    borderRadius: 8, padding: "10px 14px", color: COLORS.white,
    fontFamily: "'DM Sans', sans-serif", fontSize: 14, boxSizing: "border-box",
    outline: "none"
  };

  return (
    <div style={{ padding: "28px 24px", maxWidth: 560, margin: "0 auto" }}>
      <button onClick={onCancel} style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif", marginBottom: 20, padding: 0 }}>← Back</button>
      <h2 style={{ color: COLORS.white, fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>New Commitment</h2>
      <p style={{ color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", fontSize: 14, marginBottom: 28 }}>Define what you will do and when. Your stake is returned when you complete it.</p>

      {[
        { label: "Task Title", key: "title", type: "text", placeholder: "e.g. Finish Chapter 5 problems" },
        { label: "Description", key: "desc", type: "text", placeholder: "Optional — what exactly will you do?" },
        { label: "Deadline", key: "deadline", type: "date", placeholder: "" },
      ].map(f => (
        <div key={f.key} style={{ marginBottom: 18 }}>
          <label style={{ color: COLORS.muted, fontSize: 12, fontFamily: "'DM Mono', monospace", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{f.label}</label>
          <input type={f.type} placeholder={f.placeholder} value={form[f.key]}
            onChange={e => set(f.key, e.target.value)}
            style={{ ...inputStyle, colorScheme: "dark" }} />
        </div>
      ))}

      <div style={{ marginBottom: 28 }}>
        <label style={{ color: COLORS.muted, fontSize: 12, fontFamily: "'DM Mono', monospace", display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Stake Amount</label>
        <div style={{ display: "flex", gap: 10 }}>
          {[1, 2, 3, 4, 5].map(v => (
            <button key={v} onClick={() => set("stake", v)} style={{
              flex: 1, padding: "10px 0", borderRadius: 8, border: `1px solid ${form.stake === v ? COLORS.accent : COLORS.border}`,
              background: form.stake === v ? COLORS.accentDim : COLORS.card,
              color: form.stake === v ? COLORS.accent : COLORS.muted,
              fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Mono', monospace"
            }}>${v}</button>
          ))}
        </div>
        <p style={{ color: COLORS.muted2, fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 8 }}>Returned to you when your work is verified, plus a small bonus.</p>
      </div>

      <button onClick={() => valid && onSave(form)} style={{
        width: "100%", background: valid ? COLORS.accent : COLORS.border,
        color: valid ? COLORS.bg : COLORS.muted2, border: "none", borderRadius: 10,
        padding: "13px 0", fontWeight: 800, fontSize: 15, cursor: valid ? "pointer" : "not-allowed",
        fontFamily: "'DM Sans', sans-serif"
      }}>Commit to This Task</button>
    </div>
  );
}

function TaskDetail({ task, onBack, onSubmit, onAppeal }) {
  const [evidence, setEvidence] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!evidence.trim()) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); onSubmit(task.id, evidence); }, 3000);
  };

  return (
    <div style={{ padding: "28px 24px", maxWidth: 560, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif", marginBottom: 20, padding: 0 }}>← Back</button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <h2 style={{ color: COLORS.white, fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 800, margin: 0, flex: 1, marginRight: 12 }}>{task.title}</h2>
        <Badge status={task.status} />
      </div>
      <p style={{ color: COLORS.muted, fontFamily: "'DM Sans', sans-serif", fontSize: 14, marginBottom: 20 }}>{task.desc}</p>

      <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 16px", flex: 1, textAlign: "center" }}>
          <div style={{ color: COLORS.muted, fontSize: 11, fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>DEADLINE</div>
          <div style={{ color: COLORS.white, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{task.deadline}</div>
        </div>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 16px", flex: 1, textAlign: "center" }}>
          <div style={{ color: COLORS.muted, fontSize: 11, fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>STAKE</div>
          <div style={{ color: COLORS.accent, fontSize: 14, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>${task.stake}</div>
        </div>
        {task.status === "verified" && (
          <div style={{ background: COLORS.accentDim, border: `1px solid ${COLORS.accent}`, borderRadius: 8, padding: "10px 16px", flex: 1, textAlign: "center" }}>
            <div style={{ color: COLORS.muted, fontSize: 11, fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>BONUS</div>
            <div style={{ color: "#8FCC3A", fontSize: 14, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>+${task.reward}</div>
          </div>
        )}
      </div>

      {task.status === "verified" && (
        <div style={{ background: COLORS.accentDim, border: `1px solid ${COLORS.accent}`, borderRadius: 12, padding: "20px", textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
          <div style={{ color: COLORS.accent, fontWeight: 700, fontSize: 16, fontFamily: "'DM Sans', sans-serif" }}>Task Verified</div>
          <div style={{ color: COLORS.muted, fontSize: 13, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>Your stake has been returned plus a ${task.reward} bonus.</div>
        </div>
      )}

      {task.status === "active" && (
        <div>
          <label style={{ color: COLORS.muted, fontSize: 12, fontFamily: "'DM Mono', monospace", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Evidence of Completion</label>
          <textarea value={evidence} onChange={e => setEvidence(e.target.value)}
            placeholder="Describe what you did, paste a link, or explain your submission..."
            style={{
              width: "100%", background: COLORS.card, border: `1px solid ${COLORS.border}`,
              borderRadius: 8, padding: "12px 14px", color: COLORS.white,
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, boxSizing: "border-box",
              outline: "none", resize: "vertical", minHeight: 100
            }} />
          <button onClick={handleSubmit} disabled={!evidence.trim() || submitting} style={{
            width: "100%", marginTop: 14,
            background: evidence.trim() && !submitting ? COLORS.accent : COLORS.border,
            color: evidence.trim() && !submitting ? COLORS.bg : COLORS.muted2,
            border: "none", borderRadius: 10, padding: "13px 0",
            fontWeight: 800, fontSize: 15, cursor: evidence.trim() && !submitting ? "pointer" : "not-allowed",
            fontFamily: "'DM Sans', sans-serif"
          }}>
            {submitting ? "Reviewing..." : "Submit for Verification"}
          </button>
          {submitting && (
            <div style={{ textAlign: "center", marginTop: 16, color: COLORS.muted, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
              <div style={{ width: 32, height: 32, border: `3px solid ${COLORS.border}`, borderTopColor: COLORS.accent, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 10px" }} />
              Verifying your submission...
            </div>
          )}
        </div>
      )}

      {task.status === "pending" && (
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "20px", textAlign: "center" }}>
          <div style={{ width: 32, height: 32, border: `3px solid ${COLORS.border}`, borderTopColor: "#8FCC3A", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
          <div style={{ color: COLORS.white, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Under Review</div>
          <div style={{ color: COLORS.muted, fontSize: 13, fontFamily: "'DM Sans', sans-serif", marginTop: 6 }}>We'll have a decision within 48 hours.</div>
          <button onClick={() => onAppeal(task.id)} style={{ marginTop: 14, background: "none", border: `1px solid ${COLORS.border}`, color: COLORS.muted, borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Request Human Review</button>
        </div>
      )}

      {task.status === "appealed" && (
        <div style={{ background: "#1A1A0A", border: `1px solid #E8A83A`, borderRadius: 12, padding: "20px", textAlign: "center" }}>
          <div style={{ color: "#E8A83A", fontWeight: 700, fontFamily: "'DM Sans', sans-serif', marginBottom: 6" }}>Human Review Requested</div>
          <div style={{ color: COLORS.muted, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>A moderator will review your case within 48 hours. Your stake is safe.</div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("landing");
  const [tasks, setTasks] = useState(initialTasks);
  const [selected, setSelected] = useState(null);
  const [balance, setBalance] = useState(0.50);
  const streak = 3;

  const nav = (p) => { setPage(p); setSelected(null); };

  const saveTask = (form) => {
    const newTask = { id: Date.now(), title: form.title, desc: form.desc, deadline: form.deadline, stake: form.stake, status: "active", reward: 0 };
    setTasks(t => [...t, newTask]);
    nav("dashboard");
  };

  const submitTask = (id, evidence) => {
    const reward = 0.50;
    setTasks(t => t.map(task => task.id === id ? { ...task, status: "verified", reward } : task));
    setBalance(b => b + reward);
    setSelected(t => t ? { ...t, status: "verified", reward } : null);
  };

  const appealTask = (id) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, status: "appealed" } : task));
    setSelected(t => t ? { ...t, status: "appealed" } : null);
  };

  const globalStyles = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=DM+Mono:wght@400;500;700&display=swap'); * { margin:0; padding:0; box-sizing:border-box; } body { background: #0D1B2A; min-height: 100vh; } @keyframes spin { to { transform: rotate(360deg); } }`;

  if (page === "landing") return (
    <>
      <style>{globalStyles}</style>
      <Landing onStart={() => nav("dashboard")} onSignUp={() => nav("signup")} />
    </>
  );

  if (page === "signup") return (
    <>
      <style>{globalStyles}</style>
      <SignUp onSignUp={() => nav("dashboard")} onBack={() => nav("landing")} />
    </>
  );

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ minHeight: "100vh", background: COLORS.bg }}>
        <Navbar balance={balance} streak={streak} onNav={nav} page={page} />
        {page === "dashboard" && <Dashboard tasks={tasks} onSelect={(t) => { setSelected(t); setPage("detail"); }} onNav={nav} balance={balance} streak={streak} />}
        {page === "new" && <NewTask onSave={saveTask} onCancel={() => nav("dashboard")} />}
        {page === "detail" && selected && <TaskDetail task={tasks.find(t => t.id === selected.id) || selected} onBack={() => nav("dashboard")} onSubmit={submitTask} onAppeal={appealTask} />}
      </div>
    </>
  );
}
