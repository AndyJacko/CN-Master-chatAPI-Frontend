import React, { useEffect } from "react";

import LoginForm from "../components/User/LoginForm/LoginForm";
import RegisterForm from "../components/User/RegisterForm/RegisterForm";

const UserAuthPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="p-5">
      <div className="row">
        <div className="mb-3 fs-3 text-danger">
          You need an account to post chat messages...
        </div>
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
};

export default UserAuthPage;
