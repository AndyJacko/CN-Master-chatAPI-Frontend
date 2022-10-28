import React, { useRef, useState } from "react";

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const RegisterForm = () => {
  const [message, setMessage] = useState("");
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const pass = passwordInputRef.current.value;

    if (
      !name ||
      !email ||
      !pass ||
      name.trim() === "" ||
      email.trim() === "" ||
      pass.trim() === "" ||
      !email.includes("@") ||
      pass.length < 8 ||
      pass.length > 20
    ) {
      setMessage(<p className="text-danger">Invalid details...</p>);
      return;
    }

    const response = await fetch(
      "https://api.doubleornothingyoyos.com/createUser/",
      {
        method: "POST",
        body: JSON.stringify({ username: name, email, password: pass }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();

    if (responseData.message === "User Created") {
      setMessage(
        <p className="text-success">
          Registration complete, you can now login...
        </p>
      );
    } else {
      setMessage(<p className="text-danger">Unable to create user...</p>);
    }

    setTimeout(() => setMessage(""), 3000);

    nameInputRef.current.value = "";
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  return (
    <div className="col-lg-6 mb-3">
      <h2 className="text-uppercase">Register</h2>

      <form onSubmit={onSubmitHandler}>
        <div className="mt-3 p-3 bg-dark rounded">
          {message && message}

          <Input required ty="text" id="rn" ph="Username" rf={nameInputRef} />

          <Input required ty="email" id="re" ph="Email" rf={emailInputRef} />

          <Input
            required
            ty="password"
            id="rp"
            ph="Password"
            rf={passwordInputRef}
          />

          <Button colour="btn-secondary" label="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
