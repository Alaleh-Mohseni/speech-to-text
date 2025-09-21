export interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

export interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
    | null;
  onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition: { new (): SpeechRecognition };
    webkitSpeechRecognition: { new (): SpeechRecognition };
  }
}

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonShape = "rounded" | "circular" | "square";

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  icon?: React.ComponentType<{ size?: number }>;
  iconSize?: number;
  title?: string;
  fullWidth?: boolean;
  className?: string;
}

export interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: string) => void;
}

export interface NotificationContainerProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export interface WaveBarsProps {
  isActive: boolean;
}

export interface MicrophoneControllerProps {
  isListening: boolean;
  duration: number;
  onToggle: () => void;
}

export interface TranscriptDisplayProps {
  transcript: string;
  interimTranscript: string;
}

export interface ActionButtonsProps {
  transcript: string;
  onCopy: () => void;
  onClear: () => void;
  onDownload: () => void;
}
