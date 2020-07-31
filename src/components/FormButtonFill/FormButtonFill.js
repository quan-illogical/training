import React from "react";
import { Button } from "react-bootstrap";

export default function FormButtonFill(props) {
  return (
    <Button
      disabled={props.disabled}
      type={props.type || "submit"}
      className={props.class || "btn-fill"}
      onClick={props.onClick}
    >
      {props.content}
    </Button>
  );
}
