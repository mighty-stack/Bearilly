import Card from "../common/Card";

const ProgressCard = ({ label = "Course progress", value = 0, total = 100 }) => {
  const percent = total ? Math.round((value / total) * 100) : 0;

  return (
    <Card>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="h6 fw-bold mb-0">{label}</h3>
        <span className="fw-bold" style={{ color: "var(--primary-color)" }}>{percent}%</span>
      </div>
      <div className="progress" style={{ height: 10 }}>
        <div className="progress-bar" style={{ width: `${percent}%`, background: "var(--primary-color)" }} />
      </div>
      <p className="small text-muted-app mt-2 mb-0">{value} of {total} completed</p>
    </Card>
  );
};

export default ProgressCard;