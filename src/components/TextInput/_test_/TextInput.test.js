import React from 'react'
import {shallow} from 'enzyme'
import TextInput from "../TextInput"

describe("TextInput", () => {
    it("should render", () => {
        const wrapper = shallow(<TextInput/>)
        expect(wrapper.exists()).toBe(true)
    })
})