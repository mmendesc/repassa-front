import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import SessionContainer from './containers/SessionContainer';
import IndexContainer from './containers/IndexContainer';
import './App.scss';

function App() {
  const [authToken, setAuthToken] = useState(undefined);

  useEffect(() => {
    setAuthToken(localStorage.getItem('authToken'))
  }, [])

  // if (authToken) {
  //   return <IndexContainer />
  // }

  return (
    <div className="App">
      <div className="main-content">
        <BrowserRouter>
          <Switch>
          <Route path="/" exact>
              <IndexContainer />
            </Route>
            <Route path="/sign_in">
              <SessionContainer
                setAuthToken={setAuthToken}
                authToken={authToken}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
