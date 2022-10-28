import React from "react";

const copyYear = new Date().toLocaleDateString("en-GB", { year: "numeric" });

const MadeBy = () => {
  return (
    <div className="row p-3 text-center bg-dark text-muted">
      <small>
        Copyright &copy; {copyYear} chatAPI
        <br />
        Designed by{" "}
        <a
          className="text-decoration-none text-danger"
          href="https://andyjacko.com"
          rel="noreferrer"
          target="_blank">
          Andy Jacko
        </a>
      </small>
    </div>
  );
};

export default MadeBy;
