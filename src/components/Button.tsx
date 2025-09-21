import React from "react";
import type { ButtonProps } from "../types";

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "medium",
  shape = "rounded",
  icon: Icon,
  iconSize = 20,
  title,
  fullWidth = false,
  className = "",
}) => {
  // Base classes
  const baseClasses =
    "flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md";

  // Variant classes
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white",
    success: "bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white",
    warning:
      "bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white",
    danger: "bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white",
    info: "bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white",
  };

  // Size classes
  const sizeClasses = {
    small: shape === "circular" ? "w-8 h-8" : "px-3 py-2 text-sm",
    medium: shape === "circular" ? "w-12 h-12" : "px-4 py-3 text-base",
    large:
      shape === "circular" ? "w-16 h-16" : "px-6 py-4 text-lg font-semibold",
  };

  // Shape classes
  const shapeClasses = {
    rounded: "rounded-xl",
    circular: "rounded-full",
    square: "rounded-md",
  };

  // Width classes
  const widthClasses = fullWidth ? "w-full" : "";

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${shapeClasses[shape]}
    ${widthClasses}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      title={title}
    >
      {Icon && <Icon size={iconSize} />}
      {children && <span className={Icon ? "mr-2" : ""}>{children}</span>}
    </button>
  );
};
