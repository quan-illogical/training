import React from 'react'
import {shallow} from 'enzyme'
import FormButtonOutline from "../FormButtonOutline"

describe("Outline Button", () => {
    it("should render", () => {
        const wrapper = shallow(<FormButtonOutline/>)
        expect(wrapper.exists()).toBe(true)
    })
})