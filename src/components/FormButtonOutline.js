import React from "react";
import { Button } from "react-bootstrap";

export default function FormButtonOutline(props) {
  return (
    <Button
      disable={props.disable}
      type={props.type || "submit"}
      className={props.class || "btn-outline"}
      onClick={props.onClick}
    >
      {props.content}
    </Button>
  );
}
