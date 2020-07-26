import React from "react";
import { Button } from "react-bootstrap";

export default function FormButtonFill(props) {
  return (
    <Button type="submit" className="btn-fill" onClick={props.onClick}>
      {props.content}
    </Button>
  );
}
