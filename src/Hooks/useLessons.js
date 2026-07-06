import { useCallback, useEffect, useState } from "react";
import lessonService from "../Services/lessonService";

const DEFAULT_PARAMS = {};

const useLessons = ({ autoFetch = true, params = DEFAULT_PARAMS } = {}) => {
  const [lessons, setLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadLessons = useCallback(
    async (nextParams = params) => {
      setLoading(true);
      setError(null);

      try {
        const result = await lessonService.getLessons(nextParams);
        setLessons(Array.isArray(result) ? result : result?.lessons || []);
        return result;
      } catch (lessonError) {
        setError(lessonError);
        throw lessonError;
      } finally {
        setLoading(false);
      }
    },
    [params]
  );

  const loadLesson = useCallback(async (lessonId) => {
    setLoading(true);
    setError(null);

    try {
      const result = await lessonService.getLessonById(lessonId);
      setActiveLesson(result);
      return result;
    } catch (lessonError) {
      setError(lessonError);
      throw lessonError;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProgress = useCallback(async () => {
    const result = await lessonService.getLessonProgress();
    setProgress(result);
    return result;
  }, []);

  const completeLesson = useCallback(async (lessonId) => {
    const result = await lessonService.markLessonComplete(lessonId);
    await loadProgress();
    return result;
  }, [loadProgress]);

  const submitQuiz = useCallback(async (lessonId, answers) => {
    return lessonService.submitLessonQuiz(lessonId, answers);
  }, []);

  useEffect(() => {
    if (autoFetch) {
      loadLessons().catch(() => {});
      loadProgress().catch((progressError) => setError(progressError));
    }
  }, [autoFetch, loadLessons, loadProgress]);

  return {
    activeLesson,
    completeLesson,
    error,
    lessons,
    loadLesson,
    loadLessons,
    loadProgress,
    loading,
    progress,
    submitQuiz,
  };
};

export default useLessons;
