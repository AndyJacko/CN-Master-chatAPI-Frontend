import React from "react";

const style = "form-control btn btn-sm text-uppercase";

const Button = ({ colour, label }) => {
  return <button className={`${style} ${colour}`}>{label}</button>;
};

export default Button;
