import Login from "./pages/Login";
import Map from "./pages/Map";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useState } from "react";
import Register from "./pages/Register";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(state => state.user?.current_user)
  //console.log(user)

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Map /> : <Redirect to='/login' />}
          </Route>

          <Route path='/login'>
            {user ? <Redirect to='/' /> : <Login />}

          </Route>
          <Route path='/register'>
            {user ? <Redirect to='/' /> : <Register />}
            <Register />
          </Route>
        </Switch>
      </Router>


    </div>
  );
}

export default App;
