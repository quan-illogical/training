import React from "react";
import {Form} from "react-bootstrap"

export default function ProfilePasswordInput(props) {
  return (
    <Form.Group>
      <Form.Label>
        <p className="profile-input-label">{props.label || "Password"}</p>
      </Form.Label>
      <Form.Control
        className="profile-input"
        type="password"
        placeholder={props.placeholder || "Enter your password"}
      />
    </Form.Group>
  );
}
