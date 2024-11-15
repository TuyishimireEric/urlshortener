import axios from "axios";

export const BASE_URL = "https://urlshortener.smef.io/";

const auth = process.env.REACT_APP_AUTH_CREDENTIALS
  ? btoa(process.env.REACT_APP_AUTH_CREDENTIALS)
  : "";

const headers = {
  Authorization: `Basic ${auth}`,
};

export const getAllURLs = async () => {
  const response = await axios.get(`${BASE_URL}/urls`, {
    headers,
  });
  return response.data;
};

export const addURL = async (url: string) => {
  const response = await axios.post(
    `${BASE_URL}/urls`,
    { url },
    {
      headers,
    }
  );
  return response.data;
};

export const updateURL = async (
  id: string,
  updatedData: { url: string; ttlInSeconds: number | null }
) => {
  const response = await axios.put(`${BASE_URL}/urls/${id}`, updatedData, {
    headers,
  });
  return response.data;
};

export const deleteURL = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/urls/${id}`, {
    headers,
  });
  return response.data;
};
