import React from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import type { NotificationItemProps } from "../types";
import { Button } from "./Button";

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRemove,
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle size={20} className="text-green-500" />;
      case "error":
        return <AlertCircle size={20} className="text-red-500" />;
      default:
        return <AlertCircle size={20} className="text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border shadow-sm transition-all duration-300 ${getBgColor()}`}
    >
      {getIcon()}
      <span className="flex-1 font-medium">{notification.message}</span>
      <Button
        onClick={() => onRemove(notification.id)}
        variant="secondary"
        size="small"
        shape="circular"
        icon={X}
        iconSize={16}
        title="حذف پیام"
        className="!bg-transparent !text-gray-500 hover:!text-gray-700 !shadow-none hover:!shadow-none !transform-none hover:!transform-none"
      />
    </div>
  );
};
