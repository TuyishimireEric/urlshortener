import { deleteURL } from "../services/apiServices";
import { useState } from "react";
import showToast from "../utils/showToast";
import { useGlobalContext } from "../context/GlobalContext";

export const useDeleteURL = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { urls, setUrls } = useGlobalContext();

  const deleteExistingURL = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteURL(id);
      const updatedUrls = urls.filter((url) => url.id !== id);
      setUrls(updatedUrls);
      showToast("URL deleted successfully", "success");
    } catch (err) {
      setError("Error deleting URL");
      showToast("Error deleting URL", "error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteExistingURL, loading, error };
};
