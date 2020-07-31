import React from 'react'
import shallow from "enzyme"
import PasswordValidator from "../PasswordValidator"

const input = "123456789!Abc"

describe("function is working", () => {
    it("working", () => {
       expect(PasswordValidator({input})).toBe(true)
    })
})