import React from "react";

const style = "form-control form-control-sm text-capitalize";

const TextArea = ({ id, ph, rf, ...otherProps }) => {
  return (
    <div className="mb-3">
      <textarea
        rows="1"
        className={style}
        id={id}
        ref={rf}
        placeholder={ph}
        {...otherProps}></textarea>
    </div>
  );
};

export default TextArea;
