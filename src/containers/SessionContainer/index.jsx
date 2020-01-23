import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const SessionContainer = ({ setAuthToken, authToken, namespace }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    axios.post(`/${namespace}/sign_in`, {
      login: {
        email,
        password,
      }
    }).then( ({ data }) => {
      localStorage.setItem('authToken', data.auth_token);

      const userData = {
        namespace: data.namespace,
        name: data.name,
      }

      localStorage.setItem('userData', JSON.stringify(userData))
      setAuthToken(data.auth_token)
      setEmail(data.email)
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
