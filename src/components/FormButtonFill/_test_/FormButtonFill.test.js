import React from 'react'
import {shallow} from 'enzyme'
import FormButtonFill from "../FormButtonFill"

describe("Fill Button", () => {
    it("should render", () => {
        const wrapper = shallow(<FormButtonFill/>)
        expect(wrapper.exists()).toBe(true)
    })
})