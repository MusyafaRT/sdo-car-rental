// Button.tsx
import React from "react";
import type { LucideIcon } from "lucide-react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  variant?: "primary" | "danger" | "secondary";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  icon: Icon,
  variant = "secondary",
  className = "",
}) => {
  const baseStyle =
    "flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition cursor-pointer";
  const variantStyle = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-100 text-red-700 hover:bg-red-200",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyle[variant]} ${className}`}
    >
      {Icon && <Icon size={14} />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
