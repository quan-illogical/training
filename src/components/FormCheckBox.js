import React from "react";
import { Form } from "react-bootstrap";

export default function FormCheckBox(props) {
  return (
    <Form.Group>
      <Form.Check custom={true} type="checkbox">
        <Form.Check.Input />
        <Form.Check.Label>
          <span>{props.label || "Remember password"}</span>
        </Form.Check.Label>
      </Form.Check>
    </Form.Group>
  );
}
