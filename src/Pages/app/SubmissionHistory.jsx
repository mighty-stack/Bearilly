import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "../../Components/common/PageHeader";
import SubmissionStatus from "../../Components/assessment/SubmissionStatus";
import Card from "../../Components/common/Card";
import Loader from "../../Components/common/Loader";
import EmptyState from "../../Components/common/EmptyState";
import submissionService from "../../Services/submissionService";

const SubmissionHistory = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadSubmissions = async () => {
      try {
        setLoading(true);
        const result = await submissionService.getMySubmissions();
        const nextSubmissions = Array.isArray(result) ? result : result?.submissions || [];

        if (!ignore) {
          setSubmissions(nextSubmissions);
        }
      } catch (error) {
        if (!ignore) {
          toast.error(error?.message || "Unable to load submissions");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadSubmissions();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <Loader label="Loading submissions" />;
  }

  return (
    <>
      <PageHeader title="Submission History" subtitle="Track your submitted work and feedback." />
      {!submissions.length ? (
        <EmptyState title="No submissions yet" message="Your submitted work will appear here once it is sent to the API." />
      ) : (
        <div className="d-grid gap-3">
          {submissions.map((submission) => (
            <Card key={submission.id}>
              <div className="d-flex justify-content-between gap-3 mb-3">
                <div>
                  <h2 className="h6 fw-bold mb-1">{submission.title || submission.assessmentTitle}</h2>
                  <p className="small text-muted-app mb-0">{submission.createdAt || submission.date}</p>
                </div>
              </div>
              <SubmissionStatus status={submission.status} feedback={submission.feedback || submission.notes} />
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default SubmissionHistory;