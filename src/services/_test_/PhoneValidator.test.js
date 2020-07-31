import React from 'react'
import shallow from "enzyme"
import PhoneValidator from "../PhoneValidator"

const input = "1234567890"

describe("function is working", () => {
    it("working", () => {
       expect(PhoneValidator({input})).toBe(true)
    })
})