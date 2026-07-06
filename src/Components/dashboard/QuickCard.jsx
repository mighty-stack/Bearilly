import { FiBookOpen, FiMessageCircle, FiSend, FiTool } from "react-icons/fi";
import Card from "../common/Card";


const defaultActions = [
  { label: "Learn", icon: FiBookOpen, onClick: undefined },
  { label: "Ask AI", icon: FiMessageCircle, onClick: undefined },
  { label: "Tools", icon: FiTool, onClick: undefined },
  { label: "Submit", icon: FiSend, onClick: undefined },
];

const QuickActions = ({ actions = defaultActions }) => (
  <div>
    <h2 className="h6 fw-bold mb-2">Quick actions</h2>
    <div className="row g-2">
      {actions.map(({ label, icon: Icon, onClick }) => (
        <div className="col-6 col-md-3" key={label}>
          <Card clickable onClick={onClick} bodyClassName="text-center py-3">
            <Icon size={24} style={{ color: "var(--primary-color)" }} aria-hidden="true" />
            <p className="fw-semibold mb-0 mt-2">{label}</p>
          </Card>
        </div>
      ))}
    </div>
  </div>
);

export default QuickActions;