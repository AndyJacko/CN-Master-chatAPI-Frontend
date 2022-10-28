import React, { useEffect } from "react";

const NotFoundPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="p-5 center">
      <h2>404 - Page Not Found</h2>
    </div>
  );
};

export default NotFoundPage;
