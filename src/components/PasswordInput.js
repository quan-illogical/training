import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Eye1 from "../images/Suche03.svg";
import Eye2 from "../images/Suche04.svg";
import { useDispatch } from "react-redux";

export default function PasswordInput(props) {
  const dispatch = useDispatch();
  let dispatchType = props.dispatchType;
  const [visible, setVisible] = useState(false);
  const [eye, setEye] = useState(Eye1);
  const EyeIcon = () => {
    const showPassword = () => {
      setVisible(!visible);
      setEye(eye === Eye1 ? Eye2 : Eye1);
    };
    return (
      <img onClick={() => showPassword()} className="eye" src={eye} alt="Eye" />
    );
  };
  return (
    <Form.Group>
      <Form.Label>
        <p className={props.className_label || null}>
          {props.label || "Password"}
        </p>
      </Form.Label>
      <Form.Control
        required
        className={props.className || "base key"}
        type={visible ? "text" : "password"}
        placeholder={props.placeholder || "Enter your password"}
        defaultValue={props.defaultValue || null}
        onChange={(e) => {
          dispatch({
            type: dispatchType,
            payload: e.target.value,
          });
        }}
      />
      <EyeIcon />
      <Form.Control.Feedback type="invalid">
        {props.error || "Invalid input"}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
