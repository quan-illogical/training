import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

export default function EmailInput(props) {
  const dispatch = useDispatch();
  let dispatchType = props.dispatchType;
  return (
    <Form.Group>
      <Form.Label>
        <p>{props.label || "Email"}</p>
      </Form.Label>
      <Form.Control
        className="base email"
        type="email"
        placeholder={props.placeholder || "Enter your email"}
        onChange={(e) => {
          dispatch({
            type: dispatchType,
            payload: e.target.value,
          });
        }}
      />
    </Form.Group>
  );
}
