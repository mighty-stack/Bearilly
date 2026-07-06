import { NavLink } from "react-router-dom";
import { FiBookOpen, FiGrid, FiHome, FiMessageCircle, FiTool, FiUser, FiUsers } from "react-icons/fi";

const defaultItems = [
  { label: "Home", to: "/app/dashboard", icon: FiHome },
  { label: "Learn", to: "/app/learning", icon: FiBookOpen },
  { label: "AI Tutor", to: "/app/ai-tutor", icon: FiMessageCircle },
  { label: "Toolkit", to: "/app/toolkit", icon: FiTool },
  { label: "Assess", to: "/app/assessments", icon: FiGrid },
  { label: "Profile", to: "/app/profile", icon: FiUser },
];

const Sidebar = ({ items = defaultItems, admin = false }) => {
  const navItems = admin
    ? [...items, { label: "Admin", to: "/admin", icon: FiUsers }]
    : items;

  return (
    <aside className="d-none d-lg-flex flex-column position-fixed top-0 start-0 vh-100 bg-white border-end p-3" style={{ width: 260 }}>
      <div className="mb-4">
        <strong className="fs-4" style={{ color: "var(--primary-color)" }}>Bearily</strong>
      </div>
      <nav className="nav flex-column gap-1">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `nav-link rounded-3 d-flex align-items-center gap-2 fw-semibold ${isActive ? "text-white" : "text-dark"}`
            }
            style={({ isActive }) => ({
              background: isActive ? "var(--primary-color)" : "transparent",
              minHeight: 44,
            })}
          >
            <Icon aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;