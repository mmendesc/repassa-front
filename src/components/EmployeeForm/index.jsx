import React, { useState } from 'react';

import './style.scss';

const EmployeeForm = ({ action, employee, onSubmit }) => {
  const [email, setEmail] = useState(employee ? employee.attributes.email : '');
  const [name, setName] = useState(employee ? employee.attributes.name : '');
  const [password, setPassword] = useState('');

  const onButtonClick = () => {
    let params = {
      name,
      email,
      password,
      password_confirmation: password
    }

    if (password === '' || password === undefined) {
      params.password = undefined
      params.password_confirmation = undefined
    }

    onSubmit(params)
  }

  return (
    <div className="EmployeeForm">
      <h1>{`${action === 'new' ? 'Criar empregado' : 'Editar empregado'}`}</h1>
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

        <button onClick={onButtonClick}>
          {action === 'new' ? 'Criar' : 'Editar'}
        </button>
      </div>
    </div>
  )
};

export default EmployeeForm;