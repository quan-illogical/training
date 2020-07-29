import React from "react";
import Brand from "../components/Brand";
import { Form } from "react-bootstrap";
import FormButtonOutline from "../components/FormButtonOutline";
import FormButtonFill from "../components/FormButtonFill";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import FormCheckBox from "../components/FormCheckBox";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const handleOutlineClick = () => {
    window.location.href = "/register";
  };
  const handleFillClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: process.env.REACT_APP_LOGIN,
        data: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      let user = jwt_decode(res.data.token);

      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("phone", user.phone);
      dispatch({ type: "TOKEN", payload: res.data.token });
      dispatch({
        type: "AUTHORIZE",
        payload: localStorage.setItem("auth", true) === "true",
      });

      history.push("/profile");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="login">
      <div className="form">
        <Brand />
        <div>
          <Form className="login-form">
            <EmailInput error="Invalid email" dispatchType="EMAIL" />
            <PasswordInput
              error="Please enter a password"
              dispatchType="PASSWORD"
            />

            <div className="form-buttons">
              <FormButtonOutline
                onClick={handleOutlineClick}
                content="Register"
                type="button"
              />
              <FormButtonFill
                content="Login"
                type="submit"
                onClick={(e) => handleFillClick(e)}
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
