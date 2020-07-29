import React, { useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import store from "./redux/store"


function App() {

  const ProtectedRoute = (props) => {
    if (localStorage.getItem("auth")==="true") {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  useEffect(()=> {
    console.log(store.getState().user)
  })

  return (
    <Router>
      <Switch>
        <ProtectedRoute
          path="/profile"
          render={(props) => <Profile {...props} />}
        />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
