import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated = false,
  hasAccessCode = true,
  redirectTo = "/login",
  accessCodePath = "/access-code",
  children,
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (!hasAccessCode) {
    return <Navigate to={accessCodePath} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
