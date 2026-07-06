import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AccessCodeForm from "../../Components/auth/AccessCodeForm";
import authService from "../../Services/authService";

const accessCodeSchema = Yup.object({
  code: Yup.string().min(4, "Code is too short").required("Access code is required"),
});

const AccessCode = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ code }, { setSubmitting }) => {
    try {
      setLoading(true);
      await authService.verifyAccessCode(code);
      toast.success(`Access code accepted: ${code}`);
      navigate("/app/dashboard");
    } catch (error) {
      toast.error(error?.message || "Access code validation failed");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return <AccessCodeForm validationSchema={accessCodeSchema} onSubmit={handleSubmit} loading={loading} />;
};

export default AccessCode;