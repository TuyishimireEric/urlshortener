import { useGlobalContext } from "../context/GlobalContext";
import { updateURL } from "../services/apiServices";
import { useState } from "react";
import showToast from "../utils/showToast";

export const useUpdateURL = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [updatedUrl, setUpdatedUrl] = useState<string>(url);
  const [error, setError] = useState<string | null>(null);
  const { urls, setUrls } = useGlobalContext();

  const updateExistingURL = async (id: string) => {
    const updatedData = { url: updatedUrl, ttlInSeconds: null };
    setLoading(true);
    setError(null);
    try {
      const updatedURL = await updateURL(id, updatedData);
      const updatedUrls = urls.map((existingUrl) =>
        existingUrl.id === id ? { ...existingUrl, ...updatedURL } : existingUrl
      );
      setUrls(updatedUrls);
      showToast("URL updated successfully", "success");
      return updatedURL;
    } catch (err) {
      setError("Error updating URL");
      showToast("Error updating URL", "error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateExistingURL, loading, error, updatedUrl, setUpdatedUrl };
};
