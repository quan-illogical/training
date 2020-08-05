import React from 'react'
import {mount} from 'enzyme'
import TextInput from "../TextInput"

import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore();
const store = mockStore();

describe("Text Input", () => {
    it("render correctly", () => {
      const wrapper = mount(
        <Provider store={store}>
          <TextInput />
        </Provider>
      );
  
      expect(wrapper.exists()).toEqual(true);
    });
    
  });