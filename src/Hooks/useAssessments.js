import { useCallback, useEffect, useState } from "react";
import assessmentService from "../Services/assessmentService";
import submissionService from "../Services/submissionService";

const DEFAULT_PARAMS = {};

const useAssessments = ({ autoFetch = true, params = DEFAULT_PARAMS } = {}) => {
  const [assessments, setAssessments] = useState([]);
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAssessments = useCallback(
    async (nextParams = params) => {
      setLoading(true);
      setError(null);

      try {
        const result = await assessmentService.getAssessments(nextParams);
        setAssessments(Array.isArray(result) ? result : result?.assessments || []);
        return result;
      } catch (assessmentError) {
        setError(assessmentError);
        throw assessmentError;
      } finally {
        setLoading(false);
      }
    },
    [params]
  );

  const loadAssessment = useCallback(async (assessmentId) => {
    setLoading(true);
    setError(null);

    try {
      const result = await assessmentService.getAssessmentById(assessmentId);
      setActiveAssessment(result);
      return result;
    } catch (assessmentError) {
      setError(assessmentError);
      throw assessmentError;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMySubmissions = useCallback(async (nextParams = {}) => {
    const result = await submissionService.getMySubmissions(nextParams);
    setSubmissions(Array.isArray(result) ? result : result?.submissions || []);
    return result;
  }, []);

  const submitWork = useCallback(async (payload) => {
    const result = await submissionService.createSubmission(payload);
    await loadMySubmissions();
    return result;
  }, [loadMySubmissions]);

  useEffect(() => {
    if (autoFetch) {
      loadAssessments().catch(() => {});
      loadMySubmissions().catch((submissionError) => setError(submissionError));
    }
  }, [autoFetch, loadAssessments, loadMySubmissions]);

  return {
    activeAssessment,
    assessments,
    error,
    loadAssessment,
    loadAssessments,
    loadMySubmissions,
    loading,
    submissions,
    submitWork,
  };
};

export default useAssessments;
