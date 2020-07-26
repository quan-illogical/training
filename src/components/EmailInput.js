import React from 'react'
import {Form} from 'react-bootstrap'

export default function EmailInput(props) {
    return (
        <Form.Group>
          <Form.Label>
            <p>{props.label || "Email"}</p>
          </Form.Label>
          <Form.Control
            className="base email"
            type="email"
            placeholder={props.placeholder || "Enter your email"}
          />
        </Form.Group>
    )
}
