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
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);

  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === true) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  useEffect(() => {
    
    console.log(user.isAuthenticated)
  });

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
