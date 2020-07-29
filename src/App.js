import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {Login, Register, Profile} from "./pages";


function App() {

  const ProtectedRoute = (props) => {
    if (localStorage.getItem("auth")==="true") {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };



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
