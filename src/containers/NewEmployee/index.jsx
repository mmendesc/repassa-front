import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

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
      <h1>Create do employee</h1>
      <div className="employee-form">
        <input type="text" value={name} onChange={e => setName(e.target.value)}/>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button onClick={createEmployee}>Criar</button>
      </div>
    </div>
  )
}

export default NewEmployee;
