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
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";

export default function Register() {
  const [loading, setLoading] = useState(false)
  const state = useSelector((state) => state);
  let history = useHistory();

  const handleOutlineClick = () => {
    history.goBack();
  };

  const handleFillClick = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      if (state.password !== state.confirmPassword) {
        toast.error("Confirm password does not match with password. Please try again", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setLoading(false)
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
        setLoading(false)
        if (res.data.status === 1) {
          toast.success('Successfully created an account!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          history.push("/login");
        } else toast.error("Must not leave any field empty", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });;
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.message, {
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
    <div className="register">
      <div className="form">
        {loading ? <Loading/> : null}
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
        <div>
          <Form onSubmit={handleFillClick} className="register-form">
            <EmailInput error="Email is invalid" dispatchType="EMAIL" />
            <PasswordInput
              error="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
              dispatchType="PASSWORD"
            />
            <PasswordInput
              error="Invalid confirmation"
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
              phone={true}
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
