import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/api/v1';

const ShowEmployee = ({ authToken, currentEmployee }) => {
  const [employee, setEmployee] = useState(undefined);
  const [redirectToEdit, setRedirectToEdit] = useState(false);

  useEffect(() => {
    if (authToken) {
      axios.get(`/managers/employees/${currentEmployee}.json`).then( ({ data }) => {
        setEmployee(data.data)
      })
    }
  }, []);

  const editEmployee = () => {
    setRedirectToEdit(true);
  }

  if (!authToken) {
    return <Redirect to="/managers/sign_in" />
  }

  if (redirectToEdit) {
    return <Redirect to="/managers/employees/edit" />
  }

  return (
    <div className="ShowEmployee">
      <h1>Show do employee</h1>
      {employee && (
        <div className="employee-info">
          <h2>{`Nome: ${employee.attributes.name}`}</h2>
          <h2>{`Email: ${employee.attributes.email}`}</h2>
          <button onClick={editEmployee}>Editar</button>
        </div>
      )}
    </div>
  )
}

export default ShowEmployee;
