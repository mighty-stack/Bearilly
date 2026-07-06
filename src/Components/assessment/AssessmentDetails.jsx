import { FiSend } from "react-icons/fi";
import Button from "../common/Button";
import Card from "../common/Card";

const AssessmentDetails = ({ assessment, onStartSubmission }) => (
  <Card bodyClassName="p-4">
    <span className="badge mb-3" style={{ background: "rgba(238,146,72,.15)", color: "var(--secondary-dark)" }}>
      {assessment?.type || "Assessment"}
    </span>
    <h1 className="h3 fw-bold">{assessment?.title}</h1>
    <p className="text-muted-app">{assessment?.description}</p>
    {assessment?.instructions && (
      <div className="bg-light rounded-3 p-3 mb-3">
        <h2 className="h6 fw-bold">Instructions</h2>
        <p className="mb-0">{assessment.instructions}</p>
      </div>
    )}
    <Button icon={FiSend} onClick={onStartSubmission}>
      Submit work
    </Button>
  </Card>
);

export default AssessmentDetails;