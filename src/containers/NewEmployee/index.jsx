import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './style.scss';

const NewEmployee = ({ authToken }) => {
  const [employee, setEmployee] = useState(undefined);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToShow, setRedirectToShow] = useState(false);

  const createEmployee = () => {
    axios.post(`/managers/employees.json`, {
      employee: {
        name,
        email,
        password,
        password_confirmation: password
      }
    }).then( ({ data }) => {
      setEmployee(data.data)
      setRedirectToShow(true)
    })
  }

  if (!authToken) {
    return <Redirect to="/managers/sign_in" />
  }

  if (redirectToShow) {
    return <Redirect to={`/managers/employees/${employee.id}`} />
  }

  return (
    <div className="NewEmployee">
      <h1>Criar empregado</h1>
      <div className="employee-form">
        <div className="input-group">
          <label>Nome</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)}/>
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="input-group">
          <label>Senha</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>

        <button onClick={createEmployee}>Criar</button>
      </div>
    </div>
  )
}

export default NewEmployee;
