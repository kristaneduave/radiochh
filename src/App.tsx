import { useMemo, useState } from "react";

type Screen = "login" | "home" | "profile";
type HomeCard = "upload" | "quiz" | "forum" | "database";

const CARD_META: Record<HomeCard, { title: string; subtitle: string }> = {
  upload: { title: "Upload", subtitle: "Cases and Files" },
  quiz: { title: "Quiz", subtitle: "Daily Questions" },
  forum: { title: "Forum", subtitle: "Department Threads" },
  database: { title: "Database", subtitle: "Book Summaries" },
};

function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeCard, setActiveCard] = useState<HomeCard>("upload");

  const cards = useMemo(() => (Object.keys(CARD_META) as HomeCard[]), []);

  return (
    <div className="app-shell">
      <div className="bg-core" />
      <div className="glow-top" />
      <div className="glow-bottom" />

      {screen === "login" && (
        <main className="page">
          <section className="login-shell">
            <h1 className="page-title">Login</h1>
            <div className="login-card">
              <input
                placeholder="User"
                autoCapitalize="none"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="input"
              />
              <input
                placeholder="Pass"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="input"
              />
              <button className="primary-btn" onClick={() => setScreen("home")}>
                Enter
              </button>
              <button className="secondary-btn">Continue with Google</button>
            </div>
          </section>
        </main>
      )}

      {screen === "home" && (
        <main className="page">
          <header className="top-row">
            <div>
              <p className="hello">Hi</p>
              <div className="hello-line" />
            </div>
            <button className="profile-chip" onClick={() => setScreen("profile")}>
              View Profile
            </button>
          </header>

          <section className="grid-wrap">
            {cards.map((card) => (
              <button
                key={card}
                onClick={() => setActiveCard(card)}
                className={`home-card ${activeCard === card ? "home-card-active" : ""}`}
              >
                <h2 className="home-card-title">{CARD_META[card].title}</h2>
                <p className="home-card-subtitle">{CARD_META[card].subtitle}</p>
              </button>
            ))}
          </section>

          <nav className="bottom-bar">
            <button className="bottom-item bottom-item-active">Home</button>
            <button className="bottom-item">Modules</button>
            <button className="bottom-item" onClick={() => setScreen("profile")}>
              Profile
            </button>
          </nav>
        </main>
      )}

      {screen === "profile" && (
        <main className="page">
          <header className="profile-header">
            <button className="back-btn" onClick={() => setScreen("home")}>
              Back
            </button>
            <h1 className="page-title">User Profile</h1>
          </header>

          <section className="profile-shell">
            <div className="profile-inner">
              <h2 className="profile-name">Dr. Resident Name</h2>
              <p className="profile-meta">Radiology Resident</p>
              <div className="profile-divider" />
              <p className="profile-meta">Email: resident@radiochh.app</p>
              <p className="profile-meta">Batch: 2026</p>
              <p className="profile-meta">Department: Radiology</p>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
