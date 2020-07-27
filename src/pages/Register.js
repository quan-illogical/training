import React from "react";
import Brand from "../components/Brand";
import { Form } from "react-bootstrap";
import FormButtonOutline from "../components/FormButtonOutline";
import FormButtonFill from "../components/FormButtonFill";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import TextInput from "../components/TextInput";
import { useHistory } from "react-router-dom";
import axios from "axios"
import {useSelector} from 'react-redux'

export default function Register() {
  const state = useSelector(state => state)
  let history = useHistory();

  const handleOutlineClick = () => {
    history.goBack();
  };

  const handleFillClick = async () => {
      if (state.password !== state.confirmPassword) {
        alert("Confirm password does not match with password. Please try again")
      } else {
        const res = await axios({
        method: "post",
        url: "http://api.terralogic.ngrok.io/api/register",
        data: JSON.stringify({
          email: state.email,
          password: state.password,
          name: state.name,
          phone: state.phone
        }),
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': "*"
        }
      });
      localStorage.setItem("name", res.data.data.name)
      window.location.href="/login"
      console.log(res)
      }
  }
    
  
  return (
    <div className="register">
      <div className="form">
        <Brand />
        <div>
          <Form className="register-form">
            <EmailInput dispatchType="EMAIL" />
            <PasswordInput dispatchType="PASSWORD" />
            <PasswordInput label="Confirm Password" dispatchType="CONFIRM_PASSWORD" />
            <TextInput label="Full Name" placeholder="Enter your name" dispatchType="NAME"/>
            <TextInput label="Phone" placeholder="Enter your phone number" dispatchType="PHONE"/>
            <div className="form-buttons">
              <FormButtonOutline
                content="Back"
                onClick={(e) => handleOutlineClick(e)}
                type="button"
              />
              <FormButtonFill content="Submit" type="button" onClick={handleFillClick} />
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
