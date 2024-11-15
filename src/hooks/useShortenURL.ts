import { FormEvent, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { addURL } from "../services/apiServices";
import showToast from "../utils/showToast";

export const useShortenURL = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { setError, setLastURL } = useGlobalContext();

  const shortenURL = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await addURL(originalUrl);

      setLastURL({
        id: data.id,
        url: data.url,
        ttlInSeconds: data.ttlInSeconds,
        createdDate: data.createdDate,
        modifiedDate: data.modifiedDate,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      showToast("Error shortening URL", "error");

    } finally {
      setLoading(false);
    }
  };

  return {
    originalUrl,
    setOriginalUrl,
    shortenURL,
    loading,
  };
};
