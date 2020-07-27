import React from "react";
import {Form} from "react-bootstrap"
import { useDispatch } from "react-redux";

export default function ProfileEmailInput(props) {
  const dispatch = useDispatch();
  let dispatchType = props.dispatchType;
  return (
    <Form.Group>
      <Form.Label>
        <p className="profile-input-label">{props.label || "Email"}</p>
      </Form.Label>
      <Form.Control
        className="profile-input"
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
    </Form.Group>
  );
}
