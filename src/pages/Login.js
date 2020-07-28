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
      let user = jwt_decode(res.data.token);
      dispatch({ type: "PROFILE-NAME", payload: user.name });
      dispatch({
        type: "PROFILE-EMAIL",
        payload: user.email,
      });
      dispatch({
        type: "PROFILE-PHONE",
        payload: user.phone,
      });
      dispatch({ type: "AUTHORIZE" });
      history.push("/profile");
      console.log(user);
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
