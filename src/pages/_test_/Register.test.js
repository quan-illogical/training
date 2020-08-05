import React from 'react'
import {mount} from 'enzyme'
import Register from "../Register"

import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore();
const store = mockStore();

describe("Register page", () => {
    it("render correctly", () => {
      const wrapper = mount(
        <Provider store={store}>
          <Register />
        </Provider>
      );
  
      expect(wrapper.exists()).toEqual(true);
    });
    
  });