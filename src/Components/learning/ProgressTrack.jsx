const ProgressTracker = ({ current = 1, total = 1 }) => {
  const percent = total ? (current / total) * 100 : 0;

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between small fw-semibold mb-1">
        <span>Lesson {current}</span>
        <span>{total}</span>
      </div>
      <div className="progress" style={{ height: 8 }}>
        <div className="progress-bar" style={{ width: `${percent}%`, background: "var(--secondary-color)" }} />
      </div>
    </div>
  );
};

export default ProgressTracker;