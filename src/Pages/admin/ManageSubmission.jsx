import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SubmissionTable from "../../Components/admin/SubmissionTable";
import Button from "../../Components/common/Button";
import Card from "../../Components/common/Card";
import Loader from "../../Components/common/Loader";
import PageHeader from "../../Components/common/PageHeader";
import adminService from "../../Services/adminService";

const ManageSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadSubmissions = async () => {
      try {
        setLoading(true);
        const result = await adminService.getAdminSubmissions();
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

  const reviewSubmission = async (status) => {
    try {
      await adminService.reviewAdminSubmission(selected.id, { status });
      setSubmissions((current) => current.map((submission) => (submission.id === selected.id ? { ...submission, status } : submission)));
      toast.success(status === "approved" ? "Submission approved" : "Revision requested");
    } catch (error) {
      toast.error(error?.message || "Unable to update submission");
    }
  };

  if (loading) {
    return <Loader label="Loading submissions" />;
  }

  return (
    <>
      <PageHeader title="Manage Submissions" subtitle="Review learner work and give feedback." />
      <div className="row g-3">
        <div className="col-12 col-xl-8">
          <SubmissionTable submissions={submissions.map((submission) => ({ ...submission, studentName: submission.studentName || submission.user?.name, assessmentTitle: submission.assessmentTitle || submission.assessment?.title }))} onReview={setSelected} />
        </div>
        <div className="col-12 col-xl-4">
          <Card>
            {selected ? (
              <>
                <h2 className="h6 fw-bold">{selected.assessmentTitle}</h2>
                <p className="text-muted-app mb-1">Submitted by {selected.studentName}</p>
                <a href={selected.link} target="_blank" rel="noreferrer">Open work</a>
                <div className="d-flex gap-2 mt-3">
                  <Button size="sm" onClick={() => reviewSubmission("approved")}>Approve</Button>
                  <Button size="sm" variant="secondary" onClick={() => reviewSubmission("revision")}>Request revision</Button>
                </div>
              </>
            ) : (
              <p className="text-muted-app mb-0">Select a submission to review.</p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default ManageSubmissions;