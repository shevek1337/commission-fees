import React from "react";

interface ButtonProps {
  readonly children: React.ReactNode;
  readonly active?: boolean;
  readonly onClick?: () => void;
  readonly submit?: boolean;
}

function Button({ children, active, onClick, submit }: ButtonProps) {
  return (
    <button
      className={`btn ${active ? "active" : ""}`}
      onClick={onClick}
      type={submit ? "submit" : "button"}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  active: false,
  submit: false,
  onClick: undefined,
};

export default Button;
