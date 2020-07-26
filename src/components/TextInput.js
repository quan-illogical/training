import React from "react";
import { Form } from "react-bootstrap";

export default function TextInput(props) {
  return (
    <Form.Group>
      <Form.Label>
        <p>{props.label || "Text"}</p>
      </Form.Label>
      <Form.Control
        className="base email"
        type="text"
        placeholder={props.placeholder || "Enter your text"}
      />
    </Form.Group>
  );
}
