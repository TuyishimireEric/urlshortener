import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n";
import { GlobalProvider } from "./context/GlobalContext";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
      <Toaster />
    </GlobalProvider>
  </React.StrictMode>
);
