import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = ({
  isAuthenticated = false,
  isAdmin = false,
  redirectTo = "/login",
  fallbackPath = "/app/dashboard",
  children,
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children || <Outlet />;
};

export default AdminRoute;
