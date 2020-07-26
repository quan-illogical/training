import React from "react";
import Brand from "../components/Brand";
import { Form } from "react-bootstrap";
import FormButtonOutline from "../components/FormButtonOutline";
import FormButtonFill from "../components/FormButtonFill";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import FormCheckBox from "../components/FormCheckBox";

export default function Login() {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "/register";
  };
  return (
    <div className="login">
      <div className="form">
        <Brand />
        <div>
          <Form className="login-form">
            <EmailInput />
            <PasswordInput />

            <div className="form-buttons">
              <FormButtonOutline onClick={handleClick} content="Register" />
              <FormButtonFill content="Login" />
            </div>
            <FormCheckBox />
          </Form>
        </div>
      </div>
      <img
        className="solution-experts"
        src={require("../images/solution-experts.png")}
        alt="Solution Experts"
      />
    </div>
  );
}
