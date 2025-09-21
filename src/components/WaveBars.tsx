import React from "react";
import type { WaveBarsProps } from "../types";

export const WaveBars: React.FC<WaveBarsProps> = ({ isActive }) => {
  return (
    <div className="flex items-center justify-center gap-1 h-8">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`w-1 bg-orange-500 rounded-full transition-all duration-150 ${
            isActive ? "animate-pulse" : "h-2"
          }`}
          style={{
            height: isActive ? `${Math.random() * 20 + 8}px` : "8px",
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
    </div>
  );
};
