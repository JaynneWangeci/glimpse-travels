// client/src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import TripList from './components/TripList';
import TripDetail from './components/TripDetail';
import TripForm from './components/TripForm';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Auto-login to check for a user in the session
    fetch('/check_session')
      .then(res => {
        if (res.ok) {
          res.json().then(user => setUser(user));
        }
      });
  }, []);

  function onLogin(loggedInUser) {
    setUser(loggedInUser);
  }

  function onLogout() {
    fetch('/logout', { method: 'DELETE' }).then(() => {
      setUser(null);
    });
  }

  return (
    <Router>
      <div className="App">
        <NavBar user={user} onLogout={onLogout} />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/trips" component={TripList} />
            <Route path="/trips/new" render={() => <TripForm user={user} />} />
            <Route path="/trips/:id" component={TripDetail} />
            <Route path="/profile" render={() => <UserProfile user={user} />} />
            <Route path="/login" render={() => <Login onLogin={onLogin} />} />
            <Route path="/signup" render={() => <Signup onLogin={onLogin} />} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;