import { createStore } from "redux";

const initialState = {
  user: {
    isAuthenticated: false,
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    name: "",
    phone: "",
  },
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  phone: "",
};

function reducer(state = initialState, action) {
  if (action.type === "NAME") {
    state.name = action.payload;
  }
  if (action.type === "EMAIL") {
    state.email = action.payload;
  }
  if (action.type === "PASSWORD") {
    state.password = action.payload;
  }
  if (action.type === "CONFIRM_PASSWORD") {
    state.confirmPassword = action.payload;
  }
  if (action.type === "PHONE") {
    state.phone = action.payload;
  }
  if (action.type === "PROFILE-EMAIL") {
    state.user.email = action.payload;
  }
  if (action.type === "PROFILE-NAME") {
    state.user.name = action.payload;
  }
  if (action.type === "PROFILE-PHONE") {
    state.user.phone = action.payload;
  }
  if (action.type === "PROFILE-CURRENT-PASSWORD") {
    state.user.currentPassword = action.payload;
  }
  if (action.type === "PROFILE-NEW-PASSWORD") {
    state.user.newPassword = action.payload;
  }
  if (action.type === "PROFILE-CONFIRM-PASSWORD") {
    state.user.confirmPassword = action.payload;
  }
  if (action.type === "AUTHORIZE") {
    state.user.isAuthenticated = true;
  }
  return state;
}

const store = createStore(
  reducer,
  // Hooks up Redux Devtools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
