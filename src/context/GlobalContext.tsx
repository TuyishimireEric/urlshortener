import { createContext, useContext, useState, ReactNode } from "react";
import { ShortenedURL } from "@/types/urls";

type GlobalContextType = {
  urls: ShortenedURL[];
  setUrls: (urls: ShortenedURL[]) => void;
  error: string | null;
  setError: (error: string | null) => void;
  lastURL: ShortenedURL | null;
  setLastURL: (url: ShortenedURL) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [urls, setUrls] = useState<ShortenedURL[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastURL, setLastURL] = useState<ShortenedURL | null>(null);

  return (
    <GlobalContext.Provider
      value={{ urls, setUrls, error, setError, lastURL, setLastURL }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within GlobalProvider");
  return context;
};
