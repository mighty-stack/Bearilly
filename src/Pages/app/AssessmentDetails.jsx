import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import AssessmentInfo from "../../Components/assessment/AssessmentDetails";
import SubmissionForm from "../../Components/assessment/SubmissionForm";
import SubmissionStatus from "../../Components/assessment/SubmissionStatus";
import Loader from "../../Components/common/Loader";
import assessmentService from "../../Services/assessmentService";

const submissionSchema = Yup.object({
  title: Yup.string().required("Submission title is required"),
  link: Yup.string().url("Enter a valid URL").required("Work link is required"),
  notes: Yup.string(),
});

const AssessmentDetails = () => {
  const { assessmentId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadAssessment = async () => {
      try {
        setLoading(true);
        const result = await assessmentService.getAssessmentById(assessmentId);
        if (!ignore) {
          setAssessment(result);
        }
      } catch (error) {
        if (!ignore) {
          toast.error(error?.message || "Unable to load assessment");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadAssessment();
    return () => {
      ignore = true;
    };
  }, [assessmentId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await assessmentService.createAssessment({
        id: assessmentId,
        title: values.title,
        link: values.link,
        notes: values.notes,
      });
      setSubmitted(true);
      setShowForm(false);
      toast.success("Submission received");
    } catch (error) {
      toast.error(error?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader label="Loading assessment" />;
  }

  return (
    <div className="d-grid gap-3">
      <AssessmentInfo
        assessment={{
          title: assessment?.title || "Assessment",
          type: assessment?.type || "Project",
          description: assessment?.description || assessment?.instructions,
          instructions: assessment?.instructions || "Follow the assessment requirements and share your work link.",
        }}
        onStartSubmission={() => setShowForm(true)}
      />
      {showForm && <SubmissionForm validationSchema={submissionSchema} onSubmit={handleSubmit} />}
      {submitted && <SubmissionStatus status="pending" feedback="Your work has been received and is waiting for admin review." />}
    </div>
  );
};

export default AssessmentDetails;