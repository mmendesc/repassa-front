import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const IndexContainer = ({ email, authToken, setCurrentEmployee, currentEmployee }) => {
  const [avaliations, setAvaliations] = useState([]);
  const [redirectToShow, setRedirectToShow] = useState(false);
  const [redirectToNew, setRedirectToNew] = useState(false);

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

  const deleteAvaliation = (avaliationId) => {
    axios.delete(`/managers/avaliations/${avaliationId}.json`).then( ({ data }) => {

      setAvaliations(avaliations.filter(avaliation => avaliation.id !== avaliationId));
    })
  }

  const renderAvaliations = () => (
    avaliations.map(avaliation => (
      <div className="avaliation">
        <h2>{`Empregado: ${avaliation.attributes.employee}`}</h2>
        <h2>{`Nota: ${avaliation.attributes.grade}`}</h2>
        <h2>{`Comentário: ${avaliation.attributes.comment}`}</h2>
        <h2>{`Avaliador por: ${avaliation.attributes.manager}`}</h2>
        <button onClick={() => showEmployee(avaliation.id)}>Ver empregado</button>
        <button onClick={() => deleteAvaliation(avaliation.id)}>Deletar avaliação</button>
      </div>
    ))
  )

  if (!authToken) {
    return <Redirect to="/managers/sign_in" />
  }

  if (redirectToShow) {
    return <Redirect to={`/managers/employees/${currentEmployee}`} />
  }

  if (redirectToNew) {
    return <Redirect to="/managers/employees/new" />
  }

  return (
    <div className="IndexContainer">
      <h2>{`Seja bem vindo ${email}`}</h2>
      <h1>Avaliações</h1>
      <button onClick={() => setRedirectToNew(true)}>Criar empregado</button>
      {avaliations.length && (
        renderAvaliations()
      )}
    </div>
  )
}

export default IndexContainer;
