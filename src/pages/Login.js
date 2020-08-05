import React, { useState } from "react";
import {
  Brand,
  FormButtonFill,
  FormButtonOutline,
  EmailInput,
  PasswordInput,
  FormCheckBox,
  Loading,
} from "../components";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const state = useSelector((state) => state);
  const handleOutlineClick = () => {
    history.push("/register");
  };
  const handleFillClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
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

      if (res.data.status === 0) {
        setLoading(false);
        toast.error(res.data.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setLoading(false);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("auth", true);
        history.push("/profile");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Incorrect email or password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className="login">
      {loading ? <Loading /> : null}
      <div className="form">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Brand />
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
      <img
        className="solution-experts"
        src={require("../images/solution-experts.png")}
        alt="Solution Experts"
      />
    </div>
  );
}
