import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

export default function TextInput(props) {
  const dispatch = useDispatch();
  let dispatchType = props.dispatchType;
  return (
    <Form.Group>
      <Form.Label>
        <p className={props.className_label || null}>{props.label || "Text"}</p>
      </Form.Label>
      <Form.Control
        required
        isValid = {props.isValid || false}
        isInvalid = {props.isInvalid || false}
        className={props.className || "base email"}
        type="text"
        placeholder={props.placeholder || "Enter your text"}
        defaultValue={props.defaultValue || null}
        onChange={props.onChange || ((e) => {
          dispatch({
            type: dispatchType,
            payload: e.target.value,
          });
        })}
      />
      <Form.Control.Feedback type="invalid">
        {props.error || "Invalid input"}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
