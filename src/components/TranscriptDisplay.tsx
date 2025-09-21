import React from "react";
import type { TranscriptDisplayProps } from "../types";

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  transcript,
  interimTranscript,
}) => {
  const getWordCount = () => {
    return transcript.split(" ").filter((word) => word.length > 0).length;
  };

  const getCharCount = () => {
    return transcript.length;
  };

  return (
    <div className="my-4">
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-gray-800 text-right">متن</h3>
      </div>

      {/* Text Area */}
      <div className="mb-6">
        <div
          className="min-h-32 md:min-h-40 p-4 border-2 border-gray-200 rounded-xl text-right text-gray-700 leading-relaxed text-base"
          dir="rtl"
        >
          {transcript || interimTranscript ? (
            <>
              {transcript}
              {interimTranscript && (
                <span className="text-blue-500 opacity-75">
                  {interimTranscript}
                </span>
              )}
            </>
          ) : (
            <span className="text-gray-400">
              متن گفتار شما اینجا نمایش داده می‌شود...
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      {transcript && (
        <div className="mt-6 flex justify-between text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
          <span>
            کلمات:{" "}
            <span className="font-bold text-gray-700">{getWordCount()}</span>
          </span>
          <span>
            کاراکتر:{" "}
            <span className="font-bold text-gray-700">{getCharCount()}</span>
          </span>
        </div>
      )}
    </div>
  );
};
