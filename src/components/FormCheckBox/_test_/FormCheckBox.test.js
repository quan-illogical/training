import React from 'react'
import {shallow} from 'enzyme'
import FormCheckBox from "../FormCheckBox"

describe("Form Check", () => {
    it("should render", () => {
        const wrapper = shallow(<FormCheckBox/>)
        expect(wrapper.exists()).toBe(true)
    })
})