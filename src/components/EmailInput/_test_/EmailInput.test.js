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
  // it("should have porper props", () => {
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <EmailInput />
  //     </Provider>
  //   );
  //   expect(wrapper.find('FormControl').props()).toEqual({
  //     isValid: false,
  //     isInvalid: false,
  //     required: true,
  //     defaultValue: null,
  //     className: 'base email ' + null,
  //     type: "email",
  //     placeholder: "Enter your email",
  //     onChange={} function(){}
  //   })
  // });
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
});
