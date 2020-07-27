import React from "react";
import { Form } from "react-bootstrap";
import {useDispatch} from "react-redux"

export default function TextInput(props) {
  
  const dispatch = useDispatch();
  let dispatchType = props.dispatchType;
  return (
    <Form.Group>
      <Form.Label>
        <p>{props.label || "Text"}</p>
      </Form.Label>
      <Form.Control
        className="base email"
        type="text"
        placeholder={props.placeholder || "Enter your text"}
        onChange={(e) => {
          dispatch({
            type: dispatchType,
            payload: e.target.value
          });
        }}
      />
    </Form.Group>
  );
}
