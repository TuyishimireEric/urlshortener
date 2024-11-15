import { getAllURLs } from "../services/apiServices";
import { ShortenedURL } from "@/types/urls";
import { useEffect, useState, useCallback } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const useURLs = () => {
  const [data, setData] = useState<ShortenedURL[]>([]);
  const [loading, setLoading] = useState(true);

  const { setError, setLastURL, setUrls } = useGlobalContext();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const urls = await getAllURLs();
      setUrls(urls);
      setError(null);
    } catch (err) {
      setError("Error fetching URLs");
    } finally {
      setLoading(false);
    }
  }, [setError, setLastURL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
};

export default useURLs;
