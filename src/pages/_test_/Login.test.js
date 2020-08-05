import React from 'react'
import {mount} from 'enzyme'
import Login from "../Login"

import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore();
const store = mockStore();

describe("Login page", () => {
    it("render correctly", () => {
      const wrapper = mount(
        <Provider store={store}>
          <Login />
        </Provider>
      );
  
      expect(wrapper.exists()).toEqual(true);
    });
    
  });