import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";

const PublicLayout = () => (
  <div className="min-vh-100 d-flex flex-column">
    <header className="bg-white border-bottom py-3">
      <div className="container d-flex flex-wrap align-items-center justify-content-between gap-2">
        <Link to="/" className="text-decoration-none fw-bold fs-5" style={{ color: "var(--primary-color)" }}>
          Bearily
        </Link>
        <nav className="d-flex flex-wrap gap-2">
          <a href="#home" className="btn btn-sm btn-outline-primary">
            Home
          </a>
          <a href="#about" className="btn btn-sm btn-outline-secondary">
            About
          </a>
          <Link to="/login" className="btn btn-sm btn-outline-primary">
            Log in
          </Link>
          <Link to="/register" className="btn btn-sm btn-primary text-white">
            Register
          </Link>
        </nav>
      </div>
    </header>

    <main className="flex-grow-1">
      <Outlet />
    </main>

    <Footer />
  </div>
);

export default PublicLayout;
