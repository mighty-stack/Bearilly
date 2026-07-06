import { motion } from "framer-motion";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  icon: Icon,
  fullWidth = false,
  loading = false,
  className = "",
  disabled,
  ...props
}) => {
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
  const widthClass = fullWidth ? "w-100" : "";

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      disabled={disabled || loading}
      className={`app-btn app-btn-${variant} ${sizeClass} ${widthClass} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm" aria-hidden="true" />
      ) : Icon ? (
        <Icon aria-hidden="true" />
      ) : null}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;