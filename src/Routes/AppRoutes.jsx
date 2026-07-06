import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../Components/layout/AuthLayout";
import DashboardLayout from "../Components/layout/DashboardLayout";
import PublicLayout from "../Components/layout/PublicLayout";
import Home from "../Pages/public/Home"
import AccessCode from "../Pages/public/AccessCode"
import Login from "../Pages/public/Login"
import Register from "../Pages/public/Register"

import {
  AITutor,
  AssessmentCenter,
  AssessmentDetails,
  Dashboard,
  Learning,
  LessonDetails,
  Profile,
  SubmissionHistory,
  ToolkitHub,
} from "../Pages/app";
import {
  AdminDashboard,
  ManageAssessments,
  ManageCodes,
  ManageSubmissions,
  ManageUsers,
} from "../Pages/admin";
import AdminRoute from "./AdminRoute";
import GuestRoute from "./GuestRoute";
// import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = ({
  user = null,
  isAuthenticated = false,
  hasAccessCode = false,
}) => {
  const isAdmin = user?.role === "admin";

  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Navigate to="/#about" replace />} />
      </Route>

      <Route
        element={
          <GuestRoute
            isAuthenticated={isAuthenticated}
            hasAccessCode={hasAccessCode}
          />
        }
      >
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      <Route
        path="/access-code"
        element={
          // <ProtectedRoute
          //   isAuthenticated={isAuthenticated}
          //   hasAccessCode
          // >
            <AuthLayout
              title="Unlock your learning"
              subtitle="Enter your access code to continue."
            />
          // </ProtectedRoute>
        }
      >
        <Route index element={<AccessCode />} />
      </Route>

      <Route
        path="/app"
        element={
          // <ProtectedRoute
          //   isAuthenticated={isAuthenticated}
          //   hasAccessCode={hasAccessCode}
          // >
            <DashboardLayout user={user} />
          // </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="learning" element={<Learning />} />
        <Route path="learning/:lessonId" element={<LessonDetails />} />
        <Route path="ai-tutor" element={<AITutor />} />
        <Route path="toolkit" element={<ToolkitHub />} />
        <Route path="assessments" element={<AssessmentCenter />} />
        <Route path="assessments/:assessmentId" element={<AssessmentDetails />} />
        <Route path="submissions" element={<SubmissionHistory />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route
        path="/admin"
        element={
          <AdminRoute
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
          >
            <DashboardLayout user={user} admin />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="codes" element={<ManageCodes />} />
        <Route path="assessments" element={<ManageAssessments />} />
        <Route path="submissions" element={<ManageSubmissions />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
