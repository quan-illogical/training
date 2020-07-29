import React, {useState} from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import EmailValidator from "../services/EmailValidator"

export default function EmailInput(props) {
  const [valid, setValid] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const dispatch = useDispatch();
  let dispatchType = props.dispatchType;
  return (
    <Form.Group>
      <Form.Label>
        <p className={props.className_label || null}>
          {props.label || "Email"}
        </p>
      </Form.Label>
      <Form.Control
        isValid = {props.isValid || valid}
        isInvalid = {props.isInvalid || invalid}
        required
        className={props.className || "base email " + (valid ? "valid" : (invalid ? "invalid" : null))}
        type="email"
        placeholder={props.placeholder || "Enter your email"}
        defaultValue={props.defaultValue || null}
        onChange={props.onChange || ((e) => {
          dispatch({
            type: dispatchType,
            payload: e.target.value,
          });
          if (EmailValidator({str: e.target.value})) {
            setValid(true)
            setInvalid(false)
          } else {
            setValid(false);
            setInvalid(true);
          }
        })}
      />
      <Form.Control.Feedback type="invalid">
        {props.error || "Invalid input"}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
