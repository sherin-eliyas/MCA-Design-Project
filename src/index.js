import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./components/login";
import USP from "./components/userprofile";
import AD from "./components/admin";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-profile" element={<USP />} />
        <Route path="/admin" element={<AD />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
