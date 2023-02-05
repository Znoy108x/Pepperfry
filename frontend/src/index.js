import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import EcomState from "./Context/EcomState";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EcomState>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </EcomState>
  </React.StrictMode>
);
