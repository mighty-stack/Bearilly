import { FiInbox } from "react-icons/fi";
import Button from "./Button";

const EmptyState = ({
  title = "Nothing here yet",
  message = "Your content will appear here when it is ready.",
  actionLabel,
  onAction,
  icon: Icon = FiInbox,
}) => (
  <div className="app-card text-center p-4">
    <Icon className="mb-3 text-muted-app" size={36} aria-hidden="true" />
    <h2 className="h5 fw-bold">{title}</h2>
    <p className="text-muted-app mb-3">{message}</p>
    {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
  </div>
);

export default EmptyState;