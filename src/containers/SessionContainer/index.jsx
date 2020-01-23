import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:3001/api/v1';

const SessionContainer = ({ setAuthToken, authToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    axios.post('/employees/sign_in', {
      employee: {
        email,
        password,
      }
    }).then( ({ data }) => {
      localStorage.setItem('authToken', data.auth_token);
      setAuthToken(data.auth_token)
    }).catch( (response) => {
      // tratar o erro
    })
  }

  if (authToken) {
    return <Redirect to="/" />
  }

  return (
    <div className="SessionContainer">
      <input type="text" onChange={e => setEmail(e.target.value)}/>
      <input type="password" onChange={e => setPassword(e.target.value)}/>
      <button onClick={signIn}>Entrar</button>
    </div>
  )
}

export default SessionContainer;
