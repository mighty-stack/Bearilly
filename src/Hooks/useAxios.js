import { useCallback, useState } from "react";
import api, { unwrapData } from "../Services/api";

const useAxios = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api(config);
      const result = unwrapData(response);
      setData(result);
      return result;
    } catch (requestError) {
      setError(requestError);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    error,
    loading,
    request,
    reset,
  };
};

export default useAxios;
