import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { defaultErrorHandler } from '../../settings';
import './style.scss';

const EmployeeIndex = ({ authToken }) => {
  const [employees, setEmployees] = useState([]);
  const [redirectToShow, setRedirectToShow] = useState(false);
  const [redirectToNew, setRedirectToNew] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(undefined);
  const namespace = localStorage.getItem('namespace') || 'managers'

  useEffect(() => {
    if (authToken) {
      axios.get(`/${namespace}/employees.json`).then( ({ data }) => {
        setEmployees(data.data);
      }).catch(defaultErrorHandler)
    }
  }, []);

  const showEmployee = employeeId => {
    setCurrentEmployeeId(employeeId)
    setRedirectToShow(true)
  }

  const deleteEmployee = (employeeId) => {
    axios.delete(`/managers/employees/${employeeId}.json`).then( ({ data }) => {
      setEmployees(employees.filter(employee => employee.id !== employeeId));
    })
  }

  const renderEmployees = () => (
    employees.map(employee => (
      <div className="employee">
        <h4>{`Empregado: ${employee.attributes.name}`}</h4>
        <span>{`Email: ${employee.attributes.email}`}</span>

        {namespace === 'managers' && (
          <div className="employee-actions">
            <button onClick={() => showEmployee(employee.id)}>Ver empregado</button>
            <button onClick={() => deleteEmployee(employee.id)}>Deletar empregado</button>
          </div>
        )}
      </div>
    ))
  )

  if (!authToken) {
    return <Redirect to={`/${namespace}/sign_in`} />
  }

  if (redirectToShow) {
    return <Redirect to={`/managers/employees/${currentEmployeeId}`} />
  }

  if (redirectToNew) {
    return <Redirect to="/managers/employees/new" />
  }

  return (
    <div className="EmployeeIndex">
      <h1>Lista de empregados</h1>
      {namespace === 'managers' && (
        <button onClick={() => setRedirectToNew(true)}>Criar empregado</button>
      )}

      {employees.length && (
        <div className="employees">
          {renderEmployees()}
        </div>
      )}
    </div>
  )
}

export default EmployeeIndex;
