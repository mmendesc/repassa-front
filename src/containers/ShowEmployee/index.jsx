import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/api/v1';

const ShowEmployee = ({ authToken, match }) => {
  const [employee, setEmployee] = useState(undefined);
  const [redirectToEdit, setRedirectToEdit] = useState(false);
  const [redirectToIndex, setRedirectToIndex] = useState(false);
  const [redirectToNewAvaliation, setRedirectToNewAvaliation] = useState(false);

  useEffect(() => {
    if (authToken) {
      axios.get(`/managers/employees/${match.params.id}.json`).then( ({ data }) => {
        setEmployee(data.data)
      })
    }
  }, []);

  const editEmployee = () => {
    setRedirectToEdit(true);
  }

  const newAvaliation = () => {
    setRedirectToNewAvaliation(true);
  }

  const deleteEmployee = () => {
    axios.delete(`/managers/employees/${match.params.id}.json`).then( ({ data }) => {
      setRedirectToIndex(true)
    })
  }

  if (!authToken) {
    return <Redirect to="/managers/sign_in" />
  }

  if (redirectToEdit) {
    return <Redirect to={`/managers/employees/${match.params.id}/edit`} />
  }

  if (redirectToIndex) {
    return <Redirect to={`/`} />
  }

  if (redirectToNewAvaliation) {
    return <Redirect to={`/managers/employees/${match.params.id}/avaliations/new`} />
  }

  return (
    <div className="ShowEmployee">
      <h1>Show do employee</h1>
      {employee && (
        <div className="employee-info">
          <h2>{`Nome: ${employee.attributes.name}`}</h2>
          <h2>{`Email: ${employee.attributes.email}`}</h2>
          <button onClick={newAvaliation}>Adicionar avaliação</button>
          <button onClick={editEmployee}>Editar</button>
          <button onClick={deleteEmployee}>Deletar</button>
        </div>
      )}
    </div>
  )
}

export default ShowEmployee;
