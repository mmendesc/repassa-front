import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/api/v1';

const IndexContainer = ({ email, authToken, setCurrentEmployee }) => {
  const [avaliations, setAvaliations] = useState([]);
  const [redirectToShow, setRedirectToShow] = useState(false);

  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;

  useEffect(() => {
    if (authToken) {
      const userData = JSON.parse(localStorage.getItem('userData'))

      axios.get(`/${userData.namespace}/avaliations.json`).then( ({ data }) => {
        setAvaliations(data.data);
      })
    }
  }, []);

  const showEmployee = employeeId => {
    setCurrentEmployee(employeeId)
    setRedirectToShow(true)
  }

  const renderAvaliations = () => (
    avaliations.map(avaliation => (
      <div className="avaliation">
        <h2>{`Empregado: ${avaliation.attributes.employee}`}</h2>
        <h2>{`Nota: ${avaliation.attributes.grade}`}</h2>
        <h2>{`Comentário: ${avaliation.attributes.comment}`}</h2>
        <h2>{`Avaliador por: ${avaliation.attributes.manager}`}</h2>
        <button onClick={() => showEmployee(avaliation.id)}>Ver empregado</button>
      </div>
    ))
  )

  if (!authToken) {
    return <Redirect to="/managers/sign_in" />
  }

  if (redirectToShow) {
    return <Redirect to="/managers/employees/show" />
  }

  return (
    <div className="IndexContainer">
      <h1>{`Seja bem vindo ${email}`}</h1>
      {avaliations.length && (
        renderAvaliations()
      )}
    </div>
  )
}

export default IndexContainer;
