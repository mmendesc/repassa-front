import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SessionContainer from './containers/SessionContainer';
import IndexContainer from './containers/IndexContainer';
import ShowEmployee from './containers/ShowEmployee';
import EditEmployee from './containers/EditEmployee';

import './App.scss';
import './settings.js'

function App() {
  const [authToken, setAuthToken] = useState(undefined);
  const [currentEmployee, setCurrentEmployee] = useState(undefined);

  useEffect(() => {
    setAuthToken(localStorage.getItem('authToken'))
  }, [])

  return (
    <div className="App">
      <div className="main-content">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <IndexContainer
                authToken={authToken}
                setCurrentEmployee={setCurrentEmployee}
              />
            </Route>
            <Route path="/managers/employees/show">
              <ShowEmployee
                authToken={authToken}
                currentEmployee={currentEmployee}
              />
            </Route>
            <Route path="/managers/employees/edit">
              <EditEmployee
                authToken={authToken}
                currentEmployee={currentEmployee}
              />
            </Route>
            <Route path="/employees/sign_in">
              <SessionContainer
                setAuthToken={setAuthToken}
                authToken={authToken}
                namespace="employees"
              />
            </Route>
            <Route path="/managers/sign_in">
              <SessionContainer
                setAuthToken={setAuthToken}
                authToken={authToken}
                namespace="managers"
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
