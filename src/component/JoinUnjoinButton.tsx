import React from "react";
import { checkIcon_green } from "../assets/svgs/checkIcon_green";

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
      <span className="text-btn-label">{`${
        isJoinButton ? "unaccept" : "accept"
      }`}</span>
      {/* <span>{text}</span> */}
      {/* {!isJoinButton && checkIcon_green()} */}
    </button>
  );
};
