import React from "react";
import { NotificationContainer } from "./components/NotificationContainer";
import { MicrophoneController } from "./components/MicrophoneController";
import { TranscriptDisplay } from "./components/TranscriptDisplay";
import { ActionButtons } from "./components/ActionButtons";
import { useNotification } from "./hooks/useNotification";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import "./App.css";

const App: React.FC = () => {
  const { notifications, addNotification, removeNotification } =
    useNotification();
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    duration,
    startListening,
    stopListening,
    clearTranscript,
  } = useSpeechRecognition(addNotification);

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transcript);
      addNotification("متن با موفقیت کپی شد!", "success");
    } catch (err) {
      addNotification("خطا در کپی کردن متن", "error");
    }
  };

  const downloadTranscript = () => {
    try {
      const element = document.createElement("a");
      const file = new Blob([transcript], { type: "text/plain;charset=utf-8" });
      element.href = URL.createObjectURL(file);
      element.download = `transcript-${new Date().getTime()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      addNotification("فایل با موفقیت دانلود شد", "success");
    } catch (err) {
      addNotification("خطا در دانلود فایل", "error");
    }
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            مرورگر شما از تشخیص صدا پشتیبانی نمی‌کند
          </h2>
          <p className="text-gray-600 leading-relaxed">
            لطفاً از مرورگرهای Chrome، Edge یا Safari استفاده کنید.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <NotificationContainer
        notifications={notifications}
        onRemove={removeNotification}
      />

      <div className="max-w-md mx-auto md:max-w-lg lg:max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden py-4 md:py-6">
          {/* Header */}
          <div className="text-center bg-white py-2 md:py-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              تبدیل گفتار به متن
            </h1>
          </div>

          <MicrophoneController
            isListening={isListening}
            duration={duration}
            onToggle={handleToggleListening}
          />

          <div className="px-6 py-4 md:px-8 md:py-2">
            <TranscriptDisplay
              transcript={transcript}
              interimTranscript={interimTranscript}
            />

            <ActionButtons
              transcript={transcript}
              onCopy={copyToClipboard}
              onClear={clearTranscript}
              onDownload={downloadTranscript}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
