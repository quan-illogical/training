import React from 'react'
import {shallow} from 'enzyme'
import UploadModal from "../UploadModal"

describe("Modal", () => {
    it("should render", () => {
        const wrapper = shallow(<UploadModal/>)
        expect(wrapper.exists()).toBe(true)
    })
})