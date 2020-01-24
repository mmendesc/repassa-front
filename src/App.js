import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import SessionContainer from './containers/SessionContainer';
import IndexContainer from './containers/IndexContainer';
import ShowEmployee from './containers/ShowEmployee';
import EditEmployee from './containers/EditEmployee';
import NewEmployee from './containers/NewEmployee';
import NewAvaliation from './containers/NewAvaliation';

import './App.scss';
import './settings.js'

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [currentEmployee, setCurrentEmployee] = useState(undefined);

  if (authToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }

  return (
    <div className="App">
      <div className="main-content">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <IndexContainer
                authToken={authToken}
                setCurrentEmployee={setCurrentEmployee}
                currentEmployee={currentEmployee}
              />
            </Route>
            <Route
              path="/managers/employees/new"
              exact
              render={(props) =>
                <NewEmployee
                  {...props}
                  authToken={authToken}
                />}
            />
            <Route
              path="/managers/employees/:id"
              exact
              render={(props) =>
                <ShowEmployee
                  {...props}
                  authToken={authToken}
                />}
            />
            <Route
              path="/managers/employees/:id/edit"
              exact
              render={(props) =>
                <EditEmployee
                  {...props}
                  authToken={authToken}
                />}
            />
            <Route
              path="/managers/employees/:id/avaliations/new"
              exact
              render={(props) =>
                <NewAvaliation
                  {...props}
                  authToken={authToken}
                />}
            />
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
            <Route>
              <IndexContainer
                authToken={authToken}
                setCurrentEmployee={setCurrentEmployee}
                currentEmployee={currentEmployee}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
