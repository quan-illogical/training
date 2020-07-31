import React from 'react'
import shallow from "enzyme"
import EmailValidator from "../EmailValidator"

const str = "email123@gmail.com"

describe("function is working", () => {
    it("working", () => {
       expect(EmailValidator({str})).toBe(true)
    })
})