import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LessonContent from "../../Components/learning/LessonContent";
import ProgressTracker from "../../Components/learning/ProgressTrack";
import QuizCard from "../../Components/learning/QuizCard";
import Loader from "../../Components/common/Loader";
import lessonService from "../../Services/lessonService";

const LessonDetails = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadLesson = async () => {
      try {
        setLoading(true);
        const [lessonData, lessonList] = await Promise.all([
          lessonService.getLessonById(lessonId),
          lessonService.getLessons(),
        ]);

        if (!ignore) {
          setLesson(lessonData);
          setLessons(Array.isArray(lessonList) ? lessonList : lessonList?.lessons || []);
        }
      } catch (error) {
        if (!ignore) {
          toast.error(error?.message || "Unable to load lesson");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadLesson();
    return () => {
      ignore = true;
    };
  }, [lessonId]);

  const lessonIndex = useMemo(() => {
    if (!lesson || !lessons.length) return 0;
    return Math.max(lessons.findIndex((item) => String(item.id) === String(lessonId)), 0);
  }, [lesson, lessons, lessonId]);

  const isLast = lessons.length ? lessonIndex === lessons.length - 1 : true;

  const handleNext = () => {
    const nextLesson = lessons[lessonIndex + 1];
    if (nextLesson) {
      navigate(`/app/learning/${nextLesson.id}`);
    }
  };

  const handlePrevious = () => {
    const previousLesson = lessons[lessonIndex - 1];
    if (previousLesson) {
      navigate(`/app/learning/${previousLesson.id}`);
    } else {
      navigate("/app/learning");
    }
  };

  const handleComplete = async () => {
    try {
      await lessonService.markLessonComplete(lessonId);
      toast.success("Lesson marked complete");
      navigate("/app/assessments");
    } catch (error) {
      toast.error(error?.message || "Unable to mark lesson complete");
    }
  };

  if (loading) {
    return <Loader label="Loading lesson" />;
  }

  return (
    <>
      <ProgressTracker current={lessons.length ? lessonIndex + 1 : 1} total={lessons.length || 1} />
      <LessonContent
        lesson={lesson ? { ...lesson, content: lesson.content || lesson.description } : null}
        isLast={isLast}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onComplete={handleComplete}
      />
      <div className="mx-auto mt-3" style={{ maxWidth: 760 }}>
        <QuizCard
          question="What should each lesson screen focus on?"
          options={["One clear next action", "Many menus", "Long paragraphs only"]}
          answer="One clear next action"
          onSubmit={({ correct }) => toast[correct ? "success" : "error"](correct ? "Correct" : "Try again")}
        />
      </div>
    </>
  );
};

export default LessonDetails;