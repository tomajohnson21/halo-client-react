import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import NoMatch from './components/NoMatch';

function App() {
  
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/signin' component={SignIn} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default App;
