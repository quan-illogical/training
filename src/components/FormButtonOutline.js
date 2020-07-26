import React from "react";
import { Button } from "react-bootstrap";

export default function FormButtonOutline(props) {
  return (
    <Button type="submit" className="btn-outline" onClick={props.onClick}>
      {props.content}
    </Button>
  );
}