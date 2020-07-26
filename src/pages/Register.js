import React, { useEffect } from "react";
import Brand from "../components/Brand";
import { Form } from "react-bootstrap";
import FormButtonOutline from "../components/FormButtonOutline";
import FormButtonFill from "../components/FormButtonFill";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import TextInput from "../components/TextInput";
import { useHistory } from "react-router-dom";

export default function Register() {
  let history = useHistory();
  useEffect(() => {
    console.log(history);
  });
  const handleFillClick = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <div className="register">
      <div className="form">
        <Brand />
        <div>
          <Form className="register-form">
            <EmailInput />
            <PasswordInput />
            <PasswordInput label="Confirm Password" />
            <TextInput label="Full Name" placeholder="Enter your name" />
            <TextInput label="Phone" placeholder="Enter your phone number" />
            <div className="form-buttons">
              <FormButtonOutline
                content="Back"
                onClick={(e) => handleFillClick(e)}
              />
              <FormButtonFill content="Submit" />
            </div>
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
