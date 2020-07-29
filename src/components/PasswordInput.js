import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Eye1 from "../images/Suche03.svg";
import Eye2 from "../images/Suche04.svg";
import { useDispatch} from "react-redux";
import PasswordValidator from "../services/PasswordValidator"

export default function PasswordInput(props) {
  const [valid, setValid] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const dispatch = useDispatch();
  const dispatchType = props.dispatchType;
  const [visible, setVisible] = useState(false);
  const [eye, setEye] = useState(Eye1);
  const EyeIcon = () => {
    const showPassword = () => {
      setVisible(!visible);
      setEye(eye === Eye1 ? Eye2 : Eye1);
    };
    return (
      <img onClick={() => showPassword()} className="eye" src={eye} alt="Eye" />
    );
  };
  return (
    <Form.Group>
      <Form.Label>
        <p className={props.className_label || null}>
          {props.label || "Password"}
        </p>
      </Form.Label>
      <Form.Control
        isValid={props.isValid || valid}
        isInvalid={props.isInvalid || invalid}
        required
        className={props.className || "base key "+ (valid ? "valid" : (invalid ? "invalid" : null))}
        type={visible ? "text" : "password"}
        placeholder={props.placeholder || "Enter your password"}
        defaultValue={props.defaultValue || null}
        onChange={
          props.onChange ||
          ((e) => {
            dispatch({
              type: dispatchType,
              payload: e.target.value,
            });
            if (PasswordValidator({input: e.target.value})) {
              setValid(true)
              setInvalid(false)
            } else {
              setValid(false);
              setInvalid(true);
            }
          })
        }
      />
      <EyeIcon />
      <Form.Control.Feedback type="invalid">
        {props.error || "Invalid input"}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
