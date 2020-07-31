import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { shallow } from "enzyme";
import { ToastContainer } from "react-toastify";
import DropZone from "../DropZone";

describe("DropZone", () => {
  it("should render correctly", () => {
    const wrapper = shallow(
        <DropZone/>
    );
    expect(wrapper.exists()).toBe(true)
  });
});
