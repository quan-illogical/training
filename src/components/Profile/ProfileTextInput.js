import React from "react";
import { Form } from "react-bootstrap";

export default function ProfileTextInput(props) {
  return (
    <Form.Group>
      <Form.Label>
        <p className="profile-input-label">{props.label || "Text"}</p>
      </Form.Label>
      <Form.Control
        className="profile-input"
        type="text"
        placeholder={props.placeholder || "Enter your text"}
      />
    </Form.Group>
  );
}
