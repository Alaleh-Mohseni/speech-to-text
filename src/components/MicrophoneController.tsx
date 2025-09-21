import React from "react";
import { Mic, MicOff } from "lucide-react";
import type { MicrophoneControllerProps } from "../types";
import { WaveBars } from "./WaveBars";
import { Button } from "./Button";

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const MicrophoneController: React.FC<MicrophoneControllerProps> = ({
  isListening,
  duration,
  onToggle,
}) => {
  return (
    <div className="px-6 py-4 md:px-8 md:py-2 text-center">
      {/* Microphone Button */}
      <div className="mb-6 flex justify-center">
        <Button
          onClick={onToggle}
          variant={isListening ? "danger" : "primary"}
          size="large"
          shape="circular"
          icon={isListening ? MicOff : Mic}
          iconSize={32}
          title={isListening ? "توقف ضبط" : "شروع ضبط"}
          className="w-20 h-20 md:w-24 md:h-24 shadow-lg"
        />
      </div>

      {/* Status Text */}
      <div className="mb-4">
        <p className="text-gray-600 text-base md:text-lg">
          {isListening ? "در حال ضبط..." : "برای ضبط کلیک کنید"}
        </p>
      </div>

      {/* Wave Animation */}
      <div className="mb-4 flex justify-center">
        <div className="w-full max-w-sm">
          <WaveBars isActive={isListening} />
        </div>
      </div>

      {/* Duration */}
      <div className="mb-6">
        <span className="text-orange-500 font-mono text-lg md:text-xl font-bold">
          {formatDuration(duration)}
        </span>
      </div>
    </div>
  );
};
