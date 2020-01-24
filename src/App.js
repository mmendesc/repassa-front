import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

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
  const namespace = localStorage.getItem('namespace') || 'managers'

  if (authToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }

  const signOut = () => {
    axios.delete(`/${namespace}/sign_out.json`).then( ({ data }) => {
      localStorage.removeItem('authToken');
      setAuthToken(undefined);
      toast.success('Logout feito com sucesso')
    })
  }

  return (
    <div className="App">
      <div className="Sidebar">
        <button onClick={() => signOut() }>Sair</button>
        <button onClick={() => signOut() }>Empregados</button>
      </div>
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
                  setAuthToken={setAuthToken}
              />}
            />
            <Route
              path="/managers/employees"
              exact
              render={(props) =>
                <EmployeeIndex
                  {...props}
                  authToken={authToken}
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
