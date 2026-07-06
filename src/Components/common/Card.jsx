import { motion } from "framer-motion";

const Card = ({
  children,
  className = "",
  bodyClassName = "",
  clickable = false,
  onClick,
  ...props
}) => {
  const Component = clickable ? motion.button : motion.div;

  return (
    <Component
      type={clickable ? "button" : undefined}
      whileTap={clickable ? { scale: 0.99 } : undefined}
      onClick={onClick}
      className={`app-card ${clickable ? "is-clickable text-start w-100" : ""} ${className}`}
      {...props}
    >
      <div className={`card-body ${bodyClassName}`}>{children}</div>
    </Component>
  );
};

export default Card;