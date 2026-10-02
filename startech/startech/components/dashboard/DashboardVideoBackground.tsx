"use client";

import React from "react";

export const DashboardVideoBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none"
      aria-hidden="true"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className="w-full h-full object-cover object-center"
      >
        <source src="/dashboard.mp4" type="video/mp4" />
      </video>
      {/* Subtle dark sci-fi overlay to maintain high contrast and readability */}
      <div className="absolute inset-0 bg-background/65 backdrop-blur-[0.5px]" />
    </div>
  );
};
