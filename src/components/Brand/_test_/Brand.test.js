import React from 'react'
import { shallow } from 'enzyme'
import Brand from "../Brand"
import logo from "../../../images/brand-logo.svg"


describe("Brand", () => {
    it("should render Brand correctly", ()=>{
        const wrapper = shallow(<Brand/>)
        expect(wrapper).toMatchSnapshot()
    })

    it("should render title", () => {
        const wrapper = shallow(<Brand/>)
        const title = wrapper.find("h5")
        expect(title).toHaveLength(1)
        expect(title.text()).toEqual('Login Your Account')
    })

    it("should render image of the company logo", () => {
        const wrapper = shallow(<Brand/>)
        expect(wrapper.find("img").prop("src")).toEqual(logo)
    })
})