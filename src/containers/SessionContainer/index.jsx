import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { defaultErrorHandler } from '../../settings';

import './style.scss';

const SessionContainer = ({ setAuthToken, authToken, match }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    axios.post(`/${match.params.namespace}/sign_in`, {
      login: {
        email,
        password,
      }
    }).then( ({ data }) => {
      localStorage.setItem('authToken', data.auth_token);
      localStorage.setItem('namespace', data.namespace);

      const userData = {
        namespace: data.namespace,
        name: data.name,
      }

      localStorage.setItem('userData', JSON.stringify(userData))
      setAuthToken(data.auth_token)
      setEmail(data.email)
    }).catch(defaultErrorHandler)
  }

  if (authToken) {
    return <Redirect to="/" />
  }

  return (
    <div className="SessionContainer">
      <div className="session-form">
        <div className="input-group">
          <label>Email</label>
          <input type="email" onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="input-group">
          <label>Senha</label>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </div>
      </div>
      <button onClick={signIn}>Entrar</button>
    </div>
  )
}

export default SessionContainer;
