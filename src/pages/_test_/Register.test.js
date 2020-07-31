import React from 'react'
import {shallow} from 'enzyme'
import Register from "../Register"

describe("Register", () => {
    it("should render", () => {
        const wrapper = shallow(<Register/>)
        expect(wrapper.exists()).toBe(true)
    })
})