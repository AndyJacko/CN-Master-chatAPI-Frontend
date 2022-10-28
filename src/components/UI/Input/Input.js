import React from "react";

import "./Input.css";

const style = "form-control form-control-sm";

const Input = ({ id, ph, rf, ty, ...otherProps }) => {
  return (
    <div className="mb-3">
      <input
        className={style}
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
