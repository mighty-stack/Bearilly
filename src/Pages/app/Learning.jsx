import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LessonCard from "../../Components/learning/LessonCard";
import PageHeader from "../../Components/common/PageHeader";
import Loader from "../../Components/common/Loader";
import EmptyState from "../../Components/common/EmptyState";
import lessonService from "../../Services/lessonService";

const Learning = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadLessons = async () => {
      try {
        setLoading(true);
        const result = await lessonService.getLessons();
        const nextLessons = Array.isArray(result) ? result : result?.lessons || [];

        if (!ignore) {
          setLessons(nextLessons);
        }
      } catch (error) {
        if (!ignore) {
          toast.error(error?.message || "Unable to load lessons");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadLessons();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <Loader label="Loading lessons" />;
  }

  return (
    <>
      <PageHeader title="Learn" subtitle="Short lessons, one clear step at a time." />
      {!lessons.length ? (
        <EmptyState title="No lessons yet" message="New lessons will appear here once the API returns them." />
      ) : (
        <div className="d-grid gap-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} {...lesson} onClick={() => navigate(`/app/learning/${lesson.id}`)} />
          ))}
        </div>
      )}
    </>
  );
};

export default Learning;