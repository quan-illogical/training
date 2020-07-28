import React, { useState } from "react";
import Brand from "../components/Brand";
import { Form } from "react-bootstrap";
import FormButtonOutline from "../components/FormButtonOutline";
import FormButtonFill from "../components/FormButtonFill";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import TextInput from "../components/TextInput";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export default function Register() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [validated, setValidated] = useState(false);
  let history = useHistory();

  const handleOutlineClick = () => {
    history.goBack();
  };

  const handleFillClick = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      console.log(form.checkValidity());
      e.preventDefault();
    } else {
      try {
        e.preventDefault();
        if (state.password !== state.confirmPassword) {
          alert(
            "Confirm password does not match with password. Please try again"
          );
        } else {
          const res = await axios({
            method: "post",
            url: process.env.REACT_APP_REGISTER,
            data: JSON.stringify({
              email: state.email,
              password: state.password,
              name: state.name,
              phone: state.phone,
            }),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
          dispatch({ type: "PROFILE-NAME", payload: state.user.name });
          dispatch({
            type: "PROFILE-EMAIL",
            payload: state.user.email,
          });
          dispatch({
            type: "PROFILE-PHONE",
            payload: state.user.phone,
          });
          dispatch({
            type: "AUTHORIZE",
            payload: localStorage.getItem("auth" + res.data.id),
          });
          if (res) {
            history.push("/login");
          }
          
        }
      } catch (error) {
        alert(error.message);
      }
    }

    setValidated(true);
  };

  return (
    <div className="register">
      <div className="form">
        <Brand />
        <div>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleFillClick}
            className="register-form"
          >
            <EmailInput error="Email is invalid" dispatchType="EMAIL" />
            <PasswordInput
              error="Please enter a password"
              dispatchType="PASSWORD"
            />
            <PasswordInput
              error="Please confirm password"
              label="Confirm Password"
              dispatchType="CONFIRM_PASSWORD"
            />
            <TextInput
              error="Please enter your name"
              label="Full Name"
              placeholder="Enter your name"
              dispatchType="NAME"
            />
            <TextInput
              error="Please enter a phone number"
              label="Phone"
              placeholder="Enter your phone number"
              dispatchType="PHONE"
            />
            <div className="form-buttons">
              <FormButtonOutline
                content="Back"
                onClick={(e) => handleOutlineClick(e)}
                type="button"
              />
              <FormButtonFill
                content="Submit"
                onClick={(e) => handleFillClick(e)}
              />
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
