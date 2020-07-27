import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Eye from "../images/Suche03.svg";
import { useDispatch } from "react-redux";

export default function PasswordInput(props) {
  const dispatch = useDispatch();
  let dispatchType = props.dispatchType;
  const [visible, setVisible] = useState(false);
  const EyeIcon = () => {
    const showPassword = () => {
      setVisible(!visible);
    };
    return (
      <img onClick={() => showPassword()} className="eye" src={Eye} alt="Eye" />
    );
  };
  return (
    <Form.Group>
      <Form.Label>
        <p>{props.label || "Password"}</p>
      </Form.Label>
      <Form.Control
        className="base key"
        type={visible ? "text" : "password"}
        placeholder={props.placeholder || "Enter your password"}
        onChange={(e) => {
          dispatch({
            type: dispatchType,
            payload: e.target.value,
          });
        }}
      />
      <EyeIcon />
    </Form.Group>
  );
}
