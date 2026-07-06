import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RegisterForm from "../../Components/auth/RegisterForm";
import authService from "../../Services/authService";

const registerSchema = Yup.object({
  name: Yup.string().min(2, "Name is too short").required("Full name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const payload = {
        fullName: values.name,
        name: values.name,
        email: values.email,
        password: values.password,
      };
      const session = await authService.register(payload);
      const fullName = session?.user?.fullName || session?.user?.name || values.name;

      toast.success(`Account created for ${fullName}`);
      navigate("/app/dashboard");
    } catch (error) {
      toast.error(error?.message || "Registration failed");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return <RegisterForm validationSchema={registerSchema} onSubmit={handleSubmit} loading={loading} />;
};

export default Register;