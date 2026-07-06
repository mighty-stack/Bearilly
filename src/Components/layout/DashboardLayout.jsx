import { NavLink, Outlet } from "react-router-dom";
import { FiBookOpen, FiGrid, FiHome, FiMessageCircle, FiTool } from "react-icons/fi";
import "../../Styles/dashboard.css";
import Navbar from "./Narbar";
import Sidebar from "./Sidebar";

const mobileItems = [
  { label: "Home", to: "/app/dashboard", icon: FiHome },
  { label: "Learn", to: "/app/learning", icon: FiBookOpen },
  { label: "Tutor", to: "/app/ai-tutor", icon: FiMessageCircle },
  { label: "Tools", to: "/app/toolkit", icon: FiTool },
  { label: "Assess", to: "/app/assessments", icon: FiGrid },
];

const DashboardLayout = ({ user, admin = false }) => (
  <div className="app-shell">
    <Sidebar admin={admin} />
    <main className="dashboard-main">
      <Navbar user={user} title="SkillPath" />
      <div className="container-fluid py-3 py-lg-4">
        <Outlet />
      </div>
    </main>
    <nav className="bottom-nav d-lg-none">
      <div className="d-flex justify-content-around py-2">
        {mobileItems.map(({ label, to, icon: Icon }) => (
          <NavLink key={to} to={to} className="d-flex flex-column align-items-center gap-1 px-2">
            <Icon size={20} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  </div>
);

export default DashboardLayout;