import Button from "../common/Button";

const SubmissionTable = ({ submissions = [], onReview }) => (
  <div className="app-card table-responsive">
    <table className="table align-middle mb-0">
      <thead>
        <tr>
          <th>Student</th>
          <th>Assessment</th>
          <th>Status</th>
          <th className="text-end">Action</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((submission) => (
          <tr key={submission.id}>
            <td className="fw-semibold">{submission.studentName}</td>
            <td>{submission.assessmentTitle}</td>
            <td><span className="badge text-bg-light">{submission.status}</span></td>
            <td className="text-end">
              <Button variant="ghost" size="sm" onClick={() => onReview?.(submission)}>Review</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SubmissionTable;