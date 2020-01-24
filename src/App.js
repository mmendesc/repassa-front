import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import SessionContainer from './containers/SessionContainer';
import IndexContainer from './containers/IndexContainer';
import ShowEmployee from './containers/ShowEmployee';
import EditEmployee from './containers/EditEmployee';
import NewEmployee from './containers/NewEmployee';
import NewAvaliation from './containers/NewAvaliation';

import './App.scss';
import './settings.js'
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

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
            <Route
              path="/"
              exact
              render={(props) =>
                <IndexContainer
                  {...props}
                  authToken={authToken}
                  setCurrentEmployee={setCurrentEmployee}
                  currentEmployee={currentEmployee}
                  setAuthToken={setAuthToken}
              />}
            />
            <Route
              path="/managers/employees/new"
              exact
              render={(props) =>
                <NewEmployee
                  {...props}
                  authToken={authToken}
                  setAuthToken={setAuthToken}
              />}
            />
            <Route
              path="/managers/employees/:id"
              exact
              render={(props) =>
                <ShowEmployee
                  {...props}
                  authToken={authToken}
                  setAuthToken={setAuthToken}
                />}
            />
            <Route
              path="/managers/employees/:id/edit"
              exact
              render={(props) =>
                <EditEmployee
                  {...props}
                  authToken={authToken}
                  setAuthToken={setAuthToken}
                />}
            />
            <Route
              path="/managers/employees/:id/avaliations/new"
              exact
              render={(props) =>
                <NewAvaliation
                  {...props}
                  authToken={authToken}
                  setAuthToken={setAuthToken}
                />}
            />
            <Route
              path="/:namespace/sign_in"
              render={(props) =>
                <SessionContainer
                  {...props}
                  setAuthToken={setAuthToken}
                  authToken={authToken}
                />}
            />
            <Route>
              <IndexContainer
                authToken={authToken}
                setCurrentEmployee={setCurrentEmployee}
                currentEmployee={currentEmployee}
                setAuthToken={setAuthToken}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
