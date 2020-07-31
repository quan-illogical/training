import React from 'react'
import {shallow} from 'enzyme'
import PasswordInput from "../PasswordInput"

describe("PasswordInput", () => {
    it("should render", () => {
        const wrapper = shallow(<PasswordInput/>)
        expect(wrapper.exists()).toBe(true)
    })
})