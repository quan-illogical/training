import React from 'react'
import logo from "../../images/brand-logo.svg"

export default function Brand(props) {
    return (
        <div className="brand-component">
            <img src={logo} alt="Logo"/>
            <b>START YOUR PERSONAL PHOTO EXPERIENCE</b>
            <h5>{props.title || "Login Your Account"}</h5>
        </div>
    )
}
