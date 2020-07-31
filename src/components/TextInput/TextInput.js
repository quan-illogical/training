import React, {useState} from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {NameValidator, PhoneValidator} from "../../services"

export default function TextInput(props) {
  const [valid, setValid] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const dispatch = useDispatch();
  let dispatchType = props.dispatchType;
  return (
    <Form.Group>
      <Form.Label>
        <p className={props.className_label || null}>{props.label || "Text"}</p>
      </Form.Label>
      <Form.Control
        required
        isValid = {props.isValid || valid}
        isInvalid = {props.isInvalid || invalid}
        className={props.className || "base email "+ (valid ? "valid" : (invalid ? "invalid" : null))}
        type="text"
        placeholder={props.placeholder || "Enter your text"}
        defaultValue={props.defaultValue || null}
        onChange={props.onChange || ((e) => {
          dispatch({
            type: dispatchType,
            payload: e.target.value,
          });
          if (props.phone ? PhoneValidator({input: e.target.value}) : NameValidator({str: e.target.value}) ) {
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
