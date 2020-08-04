import React from 'react'
import {mount} from 'enzyme'
import Profile from "../Profile"

import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore();
const store = mockStore();

describe("Profile page", () => {
    it("render correctly", () => {
      const wrapper = mount(
        <Provider store={store}>
          <Profile />
        </Provider>
      );
  
      expect(wrapper.exists()).toEqual(true);
    });
    
  });