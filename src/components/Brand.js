import React from 'react'
import logo from "../images/brand-logo.svg"

export default function Brand() {
    return (
        <div className="brand-component">
            <img src={logo} alt="Logo"/>
            <b>START YOUR PERSONAL PHOTO EXPERIENCE</b>
            <h5>Login Your Account</h5>
        </div>
    )
}
