import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = ({ authToken, match }) => {
  const [employee, setEmployee] = useState(undefined);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (authToken) {
      axios.get(`/managers/employees/${match.params.id}.json`).then( ({ data }) => {
        const employeeData = data.data;
        setEmployee(employeeData)
        setEmail(employeeData.attributes.email);
        setName(employeeData.attributes.name);
      })
    }
  }, []);

  const editEmployee = () => {
    axios.put(`/managers/employees/${match.params.id}.json`, {
      employee: {
        name,
        email,
      }
    }).then( ({ data }) => {
      setEmployee(data.data)
    })
  }

  if (!authToken) {
    return <Redirect to="/managers/sign_in" />
  }

  return (
    <div className="EditEmployee">
      <h1>Edit do employee</h1>
      {employee && (
        <div className="employee-form">
          <input type="text" value={name} onChange={e => setName(e.target.value)}/>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
          <button onClick={editEmployee}>Editar</button>
        </div>
      )}
    </div>
  )
}

export default EditEmployee;
