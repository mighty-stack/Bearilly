import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiMessageCircle, FiSend, FiTool } from "react-icons/fi";
import PageHeader from "../../Components/common/PageHeader";
import WelcomeCard from "../../Components/dashboard/WelcomeCard";
import ProgressCard from "../../Components/dashboard/ProgressCard";
import QuickActions from "../../Components/dashboard/QuickCard";
import NotificationCard from "../../Components/dashboard/NotificationCard";
import useLessons from "../../Hooks/useLessons";
import useAssessments from "../../Hooks/useAssessments";
import authService from "../../Services/authService";

const Dashboard = () => {
  const navigate = useNavigate();
  const { lessons, loading: lessonsLoading, progress } = useLessons();
  const { submissions, loading: assessmentsLoading } = useAssessments();

  const user = authService.getCurrentUser();
  const actions = [
    { label: "Learn", icon: FiBookOpen, onClick: () => navigate("/app/learning") },
    { label: "Ask AI", icon: FiMessageCircle, onClick: () => navigate("/app/ai-tutor") },
    { label: "Tools", icon: FiTool, onClick: () => navigate("/app/toolkit") },
    { label: "Submit", icon: FiSend, onClick: () => navigate("/app/assessments") },
  ];

  const nextLesson = useMemo(() => {
    if (!lessons.length) return null;
    return lessons.find((lesson) => !lesson.completed) || lessons[0];
  }, [lessons]);

  const completedCount = useMemo(() => {
    if (!lessons.length) return 0;

    const completedIds = new Set(progress?.completedLessonIds || []);
    return lessons.filter((lesson) => lesson.completed || completedIds.has(lesson.id)).length;
  }, [lessons, progress]);

  const latestSubmission = submissions[0];
  const learnerName = user?.fullName || user?.name || user?.email || "Learner";

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Your learning at a glance." />
      <div className="row g-3">
        <div className="col-12 col-xl-8">
          <WelcomeCard
            name={learnerName}
            nextLesson={nextLesson?.title}
            onContinue={() => navigate(nextLesson ? `/app/learning/${nextLesson.id}` : "/app/learning")}
          />
        </div>
        <div className="col-12 col-xl-4">
          <ProgressCard value={completedCount} total={lessons.length || 1} />
        </div>
        <div className="col-12">
          <QuickActions actions={actions} />
        </div>
        <div className="col-12 col-lg-6">
          <NotificationCard
            title={latestSubmission ? "Latest submission update" : "Learning path ready"}
            message={
              latestSubmission
                ? `Your latest submission is ${latestSubmission.status || "pending"}.`
                : "Your lessons and submissions are syncing from the API."
            }
            type={latestSubmission?.status === "approved" ? "success" : "info"}
            time={latestSubmission ? "Recently updated" : "Now"}
          />
        </div>
        <div className="col-12 col-lg-6">
          <NotificationCard
            title={lessonsLoading || assessmentsLoading ? "Syncing your progress" : "New lesson available"}
            message={nextLesson ? `Continue with ${nextLesson.title}.` : "Your next lesson will appear here soon."}
            time="Live"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;