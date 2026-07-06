import * as Yup from "yup";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../Components/auth/LoginForm";
import authService from "../../Services/authService";

const loginSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const session = await authService.login(values);
      const fullName = session?.user?.fullName || session?.user?.name || session?.user?.email || "there";

      toast.success(`Welcome back, ${fullName}`);
      navigate(session?.user?.role === "admin" ? "/admin" : "/app/dashboard");
    } catch (error) {
      toast.error(error?.message || "Login failed");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return <LoginForm validationSchema={loginSchema} onSubmit={handleSubmit} loading={loading} />;
};

export default Login;