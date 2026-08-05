import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = ({
  isAuthenticated = false,
  hasAccessCode = false,
  redirectTo,
  children,
}) => {
  const defaultRedirect = "/app/dashboard";

  if (isAuthenticated) {
    return <Navigate to={redirectTo || defaultRedirect} replace />;
  }

  return children || <Outlet />;
};

export default GuestRoute;
