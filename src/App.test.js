import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { shallow } from "enzyme";

describe("renders", ()=> {
    it("should render", () => {
        const wrapper = shallow(<App />);
  expect(wrapper.exists()).toBe(true)
    })
})