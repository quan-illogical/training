import React from 'react'
import {mount} from 'enzyme'
import PasswordInput from "../PasswordInput"

import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore();
const store = mockStore();

describe("Password Input", () => {
    it("render correctly", () => {
      const wrapper = mount(
        <Provider store={store}>
          <PasswordInput />
        </Provider>
      );
  
      expect(wrapper.exists()).toEqual(true);
    });
    
  });