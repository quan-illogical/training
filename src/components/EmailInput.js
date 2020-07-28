import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

export default function EmailInput(props) {
  const dispatch = useDispatch();
  let dispatchType = props.dispatchType;
  return (
    <Form.Group>
      <Form.Label>
        <p className={props.className_label || null}>
          {props.label || "Email"}
        </p>
      </Form.Label>
      <Form.Control
        required
        className={props.className || "base email"}
        type="email"
        placeholder={props.placeholder || "Enter your email"}
        defaultValue={props.defaultValue || null}
        onChange={(e) => {
          dispatch({
            type: dispatchType,
            payload: e.target.value,
          });
        }}
      />
      <Form.Control.Feedback type="invalid">
        {props.error || "Invalid input"}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
