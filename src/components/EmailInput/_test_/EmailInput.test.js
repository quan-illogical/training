import React from "react";
import { shallow, mount } from "enzyme";
import { Form } from "react-bootstrap";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import EmailInput from "../EmailInput";

const mockStore = configureStore();
const store = mockStore();

describe("Email Input", () => {
  it("render correctly", () => {
    const wrapper = mount(
      <Provider store={store}>
        <EmailInput />
      </Provider>
    );

    expect(wrapper.exists()).toEqual(true);
  });
});

describe("Dispatch", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("dispatch correct action and payload", () => {
    const expectedActions = [
      {
        payload: "testing",
        type: "EMAIL",
      },
    ];

    store.dispatch({ type: "EMAIL", payload: "testing" });
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("dispatch onChange correctly", () => {
    const wrapper = mount(
      <Provider store={store}>
        <EmailInput
          onChange={(e) =>
            store.dispatch({ type: "EMAIL", payload: e.target.value })
          }
        />
      </Provider>
    );
    wrapper
      .find("FormControl")
      .simulate("change", { target: { value: "testing 2" } });
    expect(store.getActions()).toEqual([
      { type: "EMAIL", payload: "testing 2" },
    ]);
  });

  it("function works correctly", () => {
    const changeValid = jest.fn();
    const changeInvalid = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <EmailInput onChange={changeValid} />
      </Provider>
    );
    const handleChange = jest.spyOn(React, "useState")
    handleChange.mockImplementation(valid => [valid, changeValid]);

    console.log(wrapper.find("FormControl").props())

    wrapper.find("FormControl").simulate("change", { target: { value: "testing@gmail.com" } })
    expect(changeValid).toBeTruthy();
  });
});
