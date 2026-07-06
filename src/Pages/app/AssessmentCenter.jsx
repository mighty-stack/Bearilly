import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AssessmentCard from "../../Components/assessment/AssessmentCard";
import PageHeader from "../../Components/common/PageHeader";
import Loader from "../../Components/common/Loader";
import EmptyState from "../../Components/common/EmptyState";
import assessmentService from "../../Services/assessmentService";

const AssessmentCenter = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadAssessments = async () => {
      try {
        setLoading(true);
        const result = await assessmentService.getAssessments();
        const nextAssessments = Array.isArray(result) ? result : result?.assessments || [];

        if (!ignore) {
          setAssessments(nextAssessments);
        }
      } catch (error) {
        if (!ignore) {
          toast.error(error?.message || "Unable to load assessments");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadAssessments();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <Loader label="Loading assessments" />;
  }

  return (
    <>
      <PageHeader title="Assessments" subtitle="Complete tasks and submit your work." />
      {!assessments.length ? (
        <EmptyState title="No assessments yet" message="New assignments will appear here once the API is ready." />
      ) : (
        <div className="d-grid gap-3">
          {assessments.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              title={assessment.title}
              description={assessment.description}
              dueDate={assessment.dueDate || assessment.deadline}
              status={assessment.status || "Open"}
              onClick={() => navigate(`/app/assessments/${assessment.id}`)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AssessmentCenter;