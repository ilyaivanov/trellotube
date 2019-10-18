import React from "react";
import "./Button.css";

interface Props {
  label: string;
}

const Button = ({ label }: Props) => <div className="container-radius button">{label}</div>;

export default Button;
