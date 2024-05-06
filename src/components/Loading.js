import React from "react";
import yourImage from "../asset/4.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Loading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "rgba(0, 0, 0, 0.5)",
    }}
  >
    <img
      src={yourImage}
      alt="Loading..."
      style={{
        width: "100px",
        height: "100px",
      }}
    />
  </div>
);

export default Loading;
