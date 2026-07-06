import { Outlet } from "react-router-dom";

const AuthLayout = ({ title = "Bearily", subtitle = "Learn with simple, focused steps." }) => (
  <main className="app-shell d-flex align-items-center py-4">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-7 col-lg-5">
          <div className="text-center mb-4">
            <h1 className="fw-bold" style={{ color: "var(--primary-color)" }}>{title}</h1>
            <p className="text-muted-app mb-0">{subtitle}</p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  </main>
);

export default AuthLayout;