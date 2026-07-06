import { FiArrowRight, FiTool } from "react-icons/fi";
import Card from "../common/Card";

const ToolCard = ({ title, description, category, icon: Icon = FiTool, onOpen }) => (
  <Card clickable onClick={onOpen}>
    <div className="d-flex justify-content-between gap-3">
      <div>
        <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 42, height: 42, background: "rgba(238,146,72,.14)", color: "var(--secondary-color)" }}>
          <Icon size={22} aria-hidden="true" />
        </div>
        <h3 className="h6 fw-bold mb-1">{title}</h3>
        <p className="text-muted-app mb-2">{description}</p>
        {category && <span className="badge text-bg-light">{category}</span>}
      </div>
      <FiArrowRight className="text-muted-app flex-shrink-0" aria-hidden="true" />
    </div>
  </Card>
);

export default ToolCard;