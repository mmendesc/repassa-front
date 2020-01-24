import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import EmployeeForm from '../../components/EmployeeForm';

const EditEmployee = ({ authToken, match }) => {
  const [employee, setEmployee] = useState(undefined);
  const [redirectToShow, setRedirectToShow] = useState(false);

  useEffect(() => {
    if (authToken) {
      axios.get(`/managers/employees/${match.params.id}.json`).then( ({ data }) => {
        const employeeData = data.data;
        setEmployee(employeeData);
      })
    }
  }, []);

  const editEmployee = (params) => {
    axios.put(`/managers/employees/${match.params.id}.json`, {
      employee: params,
    }).then( ({ data }) => {
      setEmployee(data.data);
      setRedirectToShow(true);
    })
  }

  if (!authToken) {
    return <Redirect to="/managers/sign_in" />
  }

  // Loading
  if (!employee) return null;

  if (redirectToShow) {
    return <Redirect to={`/managers/employees/${employee.id}`} />
  }

  return (
    <div className="EditEmployee">
      <EmployeeForm
        action="edit"
        employee={employee}
        onSubmit={editEmployee}
      />
    </div>
  )
}

export default EditEmployee;
