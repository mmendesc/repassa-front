import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import MainLayout from './components/MainLayout';
import SessionContainer from './containers/SessionContainer';
import IndexContainer from './containers/IndexContainer';
import EmployeeIndex from './containers/EmployeeIndex';
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

  if (authToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="main-content">
            <Switch>
              <Route
                path="/"
                exact
                render={(props) =>
                  <MainLayout
                    setAuthToken={setAuthToken}
                  >
                    <IndexContainer
                      {...props}
                      authToken={authToken}
                      setAuthToken={setAuthToken}
                    />
                  </MainLayout>}
              />
              <Route
                path="/managers/employees"
                exact
                render={(props) =>
                  <MainLayout setAuthToken={setAuthToken}>
                    <EmployeeIndex
                      {...props}
                      authToken={authToken}
                    />
                  </MainLayout>}
              />
              <Route
                path="/managers/employees/new"
                exact
                render={(props) =>
                  <MainLayout setAuthToken={setAuthToken}>
                    <NewEmployee
                    {...props}
                      authToken={authToken}
                      setAuthToken={setAuthToken}
                    />
                  </MainLayout>}
              />
              <Route
                path="/managers/employees/:id"
                exact
                render={(props) =>
                  <MainLayout setAuthToken={setAuthToken}>
                    <ShowEmployee
                      {...props}
                      authToken={authToken}
                      setAuthToken={setAuthToken}
                    />
                  </MainLayout>}
              />
              <Route
                path="/managers/employees/:id/edit"
                exact
                render={(props) =>
                  <MainLayout setAuthToken={setAuthToken}>
                    <EditEmployee
                      {...props}
                      authToken={authToken}
                      setAuthToken={setAuthToken}
                    />
                  </MainLayout>}
              />
              <Route
                path="/managers/employees/:id/avaliations/new"
                exact
                render={(props) =>
                  <MainLayout setAuthToken={setAuthToken}>
                    <NewAvaliation
                      {...props}
                      authToken={authToken}
                      setAuthToken={setAuthToken}
                    />
                  </MainLayout>}
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
                <MainLayout setAuthToken={setAuthToken}>
                  <IndexContainer
                    authToken={authToken}
                    setAuthToken={setAuthToken}
                  />
                </MainLayout>
              </Route>
            </Switch>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
