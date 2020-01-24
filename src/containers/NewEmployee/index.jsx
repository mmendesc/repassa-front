import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import EmployeeForm from '../../components/EmployeeForm';

import './style.scss';

const NewEmployee = ({ authToken }) => {
  const [employee, setEmployee] = useState(undefined);
  const [redirectToShow, setRedirectToShow] = useState(false);

  const createEmployee = (params) => {
    axios.post(`/managers/employees.json`, {
      employee: params,
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
      <EmployeeForm
        action="new"
        onSubmit={createEmployee}
      />
    </div>
  )
}

export default NewEmployee;
