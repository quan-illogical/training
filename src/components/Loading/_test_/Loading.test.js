import React from 'react'
import {shallow} from 'enzyme'
import Loading from "../Loading"

describe("Loading", () => {
    it("should render", () => {
        const wrapper = shallow(<Loading/>)
        expect(wrapper.exists()).toBe(true)
    })
})