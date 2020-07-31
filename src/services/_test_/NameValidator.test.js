import React from 'react'
import shallow from "enzyme"
import NameValidator from "../NameValidator"

const str = "Aiden"

describe("function is working", () => {
    it("working", () => {
       expect(NameValidator({str})).toBe(true)
    })
})