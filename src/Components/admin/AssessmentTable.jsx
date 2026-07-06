import Button from "../common/Button";

const AssessmentTable = ({ assessments = [], onEdit, onDelete }) => (
  <div className="app-card table-responsive">
    <table className="table align-middle mb-0">
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Due date</th>
          <th className="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        {assessments.map((assessment) => (
          <tr key={assessment.id || assessment.title}>
            <td className="fw-semibold">{assessment.title}</td>
            <td>{assessment.type}</td>
            <td>{assessment.dueDate}</td>
            <td className="text-end">
              <Button variant="ghost" size="sm" onClick={() => onEdit?.(assessment)}>Edit</Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete?.(assessment)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AssessmentTable;