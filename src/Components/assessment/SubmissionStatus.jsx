import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import Card from "../common/Card";

const statusConfig = {
  approved: { icon: FiCheckCircle, color: "var(--success)", label: "Approved" },
  rejected: { icon: FiXCircle, color: "var(--danger)", label: "Needs revision" },
  pending: { icon: FiClock, color: "var(--warning)", label: "Pending review" },
};

const SubmissionStatus = ({ status = "pending", feedback }) => {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <Card>
      <div className="d-flex gap-3">
        <Icon size={28} style={{ color: config.color }} aria-hidden="true" />
        <div>
          <h3 className="h6 fw-bold mb-1">{config.label}</h3>
          <p className="text-muted-app mb-0">{feedback || "Your submission status will update here."}</p>
        </div>
      </div>
    </Card>
  );
};

export default SubmissionStatus;