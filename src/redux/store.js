import { createStore } from "redux";

const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
};

function reducer(state = initialState, action) {
    if (action.type === "NAME") {
        state.name = action.payload
    }
    if (action.type === "EMAIL") {
        state.email = action.payload
    }
    if (action.type === "PASSWORD") {
        state.password = action.payload
    }
    if (action.type === "CONFIRM_PASSWORD") {
        state.confirmPassword = action.payload
    }
    if (action.type === "PHONE") {
        state.phone = action.payload
    }
    return state
};

const store = createStore(
  reducer,
  // Hooks up Redux Devtools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store
