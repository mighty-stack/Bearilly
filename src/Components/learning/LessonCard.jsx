import { FiCheckCircle, FiClock, FiPlayCircle } from "react-icons/fi";
import Card from "../common/Card";

const LessonCard = ({ title, description, duration, completed = false, locked = false, onClick }) => (
  <Card clickable={!locked} onClick={locked ? undefined : onClick} className={locked ? "opacity-75" : ""}>
    <div className="d-flex gap-3 align-items-start">
      <div className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 44, height: 44, background: completed ? "rgba(34,197,94,.12)" : "rgba(36,138,142,.12)", color: completed ? "var(--success)" : "var(--primary-color)" }}>
        {completed ? <FiCheckCircle size={22} /> : <FiPlayCircle size={22} />}
      </div>
      <div className="flex-grow-1">
        <h3 className="h6 fw-bold mb-1">{title}</h3>
        <p className="text-muted-app mb-2">{description}</p>
        {duration && <small className="text-muted-app"><FiClock className="me-1" />{duration}</small>}
      </div>
    </div>
  </Card>
);

export default LessonCard;