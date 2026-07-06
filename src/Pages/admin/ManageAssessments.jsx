import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AssessmentTable from "../../Components/admin/AssessmentTable";
import Button from "../../Components/common/Button";
import Loader from "../../Components/common/Loader";
import PageHeader from "../../Components/common/PageHeader";
import assessmentService from "../../Services/assessmentService";

const ManageAssessments = () => {
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

  const deleteAssessment = async (selectedAssessment) => {
    try {
      await assessmentService.deleteAssessment(selectedAssessment.id);
      setAssessments((current) => current.filter((assessment) => assessment.id !== selectedAssessment.id));
      toast.success("Assessment deleted");
    } catch (error) {
      toast.error(error?.message || "Unable to delete assessment");
    }
  };

  if (loading) {
    return <Loader label="Loading assessments" />;
  }

  return (
    <>
      <PageHeader title="Manage Assessments" subtitle="Create, edit, and remove learner tasks." action={<Button>Create assessment</Button>} />
      <AssessmentTable
        assessments={assessments}
        onEdit={(assessment) => toast.success(`Editing ${assessment.title}`)}
        onDelete={deleteAssessment}
      />
    </>
  );
};

export default ManageAssessments;