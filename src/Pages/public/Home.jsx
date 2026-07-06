import { Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiMessageCircle, FiTool } from "react-icons/fi";
import { motion } from "framer-motion";
import Card from "../../Components/common/Card";
import About from "./About";

const features = [
  {
    title: "Bite-size lessons",
    text: "Move through focused learning cards without getting lost in menus.",
    icon: FiBookOpen,
  },
  {
    title: "AI tutor",
    text: "Ask questions while studying and get simple explanations.",
    icon: FiMessageCircle,
  },
  {
    title: "Useful toolkit",
    text: "Open practical tools fast when you need help completing tasks.",
    icon: FiTool,
  },
];

const Home = () => (
  <section className="app-shell">
    <section className="container py-4 py-lg-5">
      <div className="row align-items-center g-4">
        <div className="col-12 col-lg-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge mb-3" style={{ background: "rgba(36,138,142,.12)", color: "var(--primary-dark)" }}>
              Mobile-first learning
            </span>
            <h1 className="display-5 fw-bold mb-3">Learn skills in simple daily steps.</h1>
            <p className="lead text-muted-app mb-4">
              Register, unlock your access code, learn lessons, chat with your AI tutor, and submit assessments in one clean flow.
            </p>
            <div className="d-grid d-sm-flex gap-2">
              <Link to="/register" className="app-btn app-btn-primary text-decoration-none">
                <FiArrowRight aria-hidden="true" />
                <span>Get started</span>
              </Link>
              <Link to="/login" className="app-btn app-btn-ghost text-decoration-none">
                Log in
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="col-12 col-lg-6">
          <Card bodyClassName="p-3 p-sm-4">
            <div className="rounded-4 p-3" style={{ background: "var(--background-color)" }}>
              <div className="app-card p-3 mb-3">
                <small className="text-muted-app fw-semibold">Today</small>
                <h2 className="h5 fw-bold mt-1">Intro to Digital Skills</h2>
                <div className="progress" style={{ height: 10 }}>
                  <div className="progress-bar" style={{ width: "64%", background: "var(--primary-color)" }} />
                </div>
              </div>
              <div className="d-grid gap-2">
                {["Watch lesson", "Ask AI tutor", "Submit task"].map((item) => (
                  <div className="app-card px-3 py-2 fw-semibold" key={item}>{item}</div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <section className="container pb-5">
      <div className="row g-3">
        {features.map(({ title, text, icon: Icon }) => (
          <div className="col-12 col-md-4" key={title}>
            <Card bodyClassName="p-4 h-100">
              <Icon size={28} style={{ color: "var(--primary-color)" }} aria-hidden="true" />
              <h2 className="h5 fw-bold mt-3">{title}</h2>
              <p className="text-muted-app mb-0">{text}</p>
            </Card>
          </div>
        ))}
      </div>
    </section>
    <About />
  </section>
);

export default Home;