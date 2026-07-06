import { FiClock, FiFileText } from "react-icons/fi";
import Card from "../common/Card";

const AssessmentCard = ({ title, description, dueDate, status = "Open", onClick }) => (
  <Card clickable onClick={onClick}>
    <div className="d-flex gap-3">
      <div className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 44, height: 44, background: "rgba(36,138,142,.12)", color: "var(--primary-color)" }}>
        <FiFileText size={22} aria-hidden="true" />
      </div>
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between gap-2">
          <h3 className="h6 fw-bold mb-1">{title}</h3>
          <span className="badge text-bg-light align-self-start">{status}</span>
        </div>
        <p className="text-muted-app mb-2">{description}</p>
        {dueDate && <small className="text-muted-app"><FiClock className="me-1" />Due {dueDate}</small>}
      </div>
    </div>
  </Card>
);

export default AssessmentCard;