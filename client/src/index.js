import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css"; // Make sure this line is present

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
