// components/GlassLoader.jsx
"use client";
import React, { useEffect, useState } from "react";

const GlassLoader = ({ size = 60, borderWidth = 4 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 500); // 0.5s intentional delay
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null; // Don't render loader immediately

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="w-full h-full rounded-full animate-spin"
        style={{
          borderWidth: `${borderWidth}px`,
          borderStyle: "solid",
          borderTopColor: "rgba(99, 102, 241, 0.8)", // indigo
          borderRightColor: "rgba(168, 85, 247, 0.8)", // purple
          borderBottomColor: "rgba(244, 114, 182, 0.8)", // pink
          borderLeftColor: "rgba(6, 182, 212, 0.8)", // cyan
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <div
          className="w-full h-full rounded-full animate-pulse"
          style={{
            background: "rgba(255,255,255,0.05)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default GlassLoader;
