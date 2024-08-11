import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  buttonStyle?: string;
  isAuthenticated: boolean;
  eventStatus?: string;
  onClick: () => void;
  text: string;
  disabled?: boolean;
  isJoinButton: boolean; // Added to distinguish between "Join" and "Unjoin"
}

export const JoinUnjoinButton: React.FC<ButtonProps> = ({
  type = "button",
  buttonStyle = "",
  isAuthenticated,
  eventStatus,
  onClick,
  text,
  disabled = false,
  isJoinButton,
}) => {
  const baseStyle =
    "flex gap-3 items-center justify-center text-sm font-medium";
  const statusStyle =
    eventStatus === "closed" ? "bg-lightgrey pointer-events-none" : "";
  const displayStyle = isAuthenticated ? "flex" : "none";

  return (
    <button
      type={type}
      className={`${baseStyle} ${buttonStyle} ${statusStyle}`}
      style={{ display: displayStyle }}
      onClick={onClick}
      disabled={disabled}
    >
      {`${isJoinButton ? "Join" : "Unjoin"}, ${text}`}
    </button>
  );
};
