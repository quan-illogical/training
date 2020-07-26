import React from "react";
import {Form} from "react-bootstrap"

export default function ProfileEmailInput(props) {
  return (
    <Form.Group>
      <Form.Label>
        <p className="profile-input-label">{props.label || "Email"}</p>
      </Form.Label>
      <Form.Control
        className="profile-input"
        type="email"
        placeholder={props.placeholder || "Enter your email"}
      />
    </Form.Group>
  );
}
