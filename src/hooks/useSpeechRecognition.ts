import { useState, useEffect, useRef } from "react";
import type { SpeechRecognition, SpeechRecognitionEvent } from "../types";

export const useSpeechRecognition = (
  onNotification: (message: string, type: "success" | "error" | "info") => void
) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      setIsSupported(true);
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();

      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "fa-IR";

      recognition.onstart = () => {
        setIsListening(true);
        setDuration(0);
        setError("");
        onNotification("ضبط صدا شروع شد", "success");

        intervalRef.current = setInterval(() => {
          setDuration((prev) => prev + 1);
        }, 1000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript("");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        onNotification("ضبط صدا متوقف شد", "info");
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interim = "";
        let final = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            final += result[0].transcript + " ";
          } else {
            interim += result[0].transcript;
          }
        }

        setInterimTranscript(interim);
        if (final) {
          setTranscript((prev) => prev + final);
        }
      };

      recognition.onerror = (event: any) => {
        const errorMessage = `خطا در تشخیص صدا: ${event.error}`;
        setError(errorMessage);
        setIsListening(false);
        onNotification(errorMessage, "error");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [onNotification]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const clearTranscript = () => {
    setTranscript("");
    setInterimTranscript("");
    setDuration(0);
    onNotification("متن پاک شد", "info");
  };

  return {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    duration,
    error,
    startListening,
    stopListening,
    clearTranscript,
    setTranscript,
  };
};
