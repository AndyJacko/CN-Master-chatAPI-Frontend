import React from "react";

import "./ChatInput.css";

const Input = ({ id, ph, rf, ty, ...otherProps }) => {
  return (
    <div>
      <input
        className="todo-input"
        type={ty}
        id={id}
        placeholder={ph}
        ref={rf}
        {...otherProps}
      />
    </div>
  );
};

export default Input;
