import { FiCheckCircle, FiInfo } from "react-icons/fi";
import Card from "../common/Card";

const NotificationCard = ({ title, message, type = "info", time }) => {
  const Icon = type === "success" ? FiCheckCircle : FiInfo;
  const color = type === "success" ? "var(--success)" : "var(--info)";

  return (
    <Card>
      <div className="d-flex gap-3">
        <Icon size={22} style={{ color }} aria-hidden="true" />
        <div>
          <h3 className="h6 fw-bold mb-1">{title}</h3>
          <p className="mb-1 text-muted-app">{message}</p>
          {time && <small className="text-muted-app">{time}</small>}
        </div>
      </div>
    </Card>
  );
};

export default NotificationCard;