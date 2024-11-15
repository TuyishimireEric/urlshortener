import axios from "axios";

export const BASE_URL = "https://urlshortener.smef.io/";
// export const AUTHENTICATION = process.env.REACT_APP_AUTHENTICATION ?? "";



const auth = btoa("abat:5hWDEcFK4FUW");

export const getAllURLs = async () => {
  const response = await axios.get(`${BASE_URL}/urls`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  return response.data;
};

export const addURL = async (url: string) => {
  const response = await axios.post(
    `${BASE_URL}/urls`,
    { url },
    {
      headers: { Authorization: `Basic ${auth}` },
    }
  );
  return response.data;
};

export const updateURL = async (
  id: string,
  updatedData: { url: string; ttlInSeconds: number | null }
) => {
  const response = await axios.put(`${BASE_URL}/urls/${id}`, updatedData, {
    headers: { Authorization: `Basic ${auth}` },
  });
  return response.data;
};

export const deleteURL = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/urls/${id}`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  return response.data;
};
