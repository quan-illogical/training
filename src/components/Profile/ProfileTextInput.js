import React from "react";
import { Form } from "react-bootstrap";
import {useDispatch} from "react-redux"

export default function ProfileTextInput(props) {
  const dispatch = useDispatch();
  let dispatchType = props.dispatchType;
  return (
    <Form.Group>
      <Form.Label>
        <p className="profile-input-label">{props.label || "Text"}</p>
      </Form.Label>
      <Form.Control
        className="profile-input"
        type="text"
        placeholder={props.placeholder || "Enter your text"}
        defaultValue={props.defaultValue || null}
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
