import React from "react";
import Brand from "../components/Brand";
import { Form } from "react-bootstrap";
import FormButtonOutline from "../components/FormButtonOutline";
import FormButtonFill from "../components/FormButtonFill";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import FormCheckBox from "../components/FormCheckBox";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Login() {
  let user = localStorage.getItem("name");

  const state = useSelector((state) => state);
  const handleOutlineClick = () => {
    window.location.href = "/register";
  };
  const handleFillClick = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://api.terralogic.ngrok.io/api/login",
        data: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/profile";
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="login">
      <div className="form">
        <Brand />
        {user !== null ? (
          <div style={{color: "#6ab04c"}}>
            Hello {user}! You've just recently made an account, and now you can
            login!
          </div>
        ) : null}
        <div>
          <Form className="login-form">
            <EmailInput dispatchType="EMAIL" />
            <PasswordInput dispatchType="PASSWORD" />

            <div className="form-buttons">
              <FormButtonOutline
                onClick={handleOutlineClick}
                content="Register"
                type="button"
              />
              <FormButtonFill
                content="Login"
                type="button"
                onClick={handleFillClick}
              />
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
