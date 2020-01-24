import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { defaultErrorHandler } from '../../settings';

const IndexContainer = ({ email, authToken, setCurrentEmployee, currentEmployee, setAuthToken }) => {
  const [avaliations, setAvaliations] = useState([]);
  const [redirectToShow, setRedirectToShow] = useState(false);
  const [redirectToNew, setRedirectToNew] = useState(false);
  const namespace = localStorage.getItem('namespace') || 'managers'

  useEffect(() => {
    if (authToken) {
      axios.get(`/${namespace}/avaliations.json`).then( ({ data }) => {
        setAvaliations(data.data);
      }).catch(defaultErrorHandler)
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

  const signOut = () => {
    axios.delete(`/${namespace}/sign_out.json`).then( ({ data }) => {
      localStorage.removeItem('authToken');
      setAuthToken(undefined);
    })
  }

  const renderAvaliations = () => (
    avaliations.map(avaliation => (
      <div className="avaliation">
        <h2>{`Empregado: ${avaliation.attributes.employee}`}</h2>
        <h2>{`Nota: ${avaliation.attributes.grade}`}</h2>
        <h2>{`Comentário: ${avaliation.attributes.comment}`}</h2>
        <h2>{`Avaliador por: ${avaliation.attributes.manager}`}</h2>
        {namespace === 'managers' && (
          <React.Fragment>
            <button onClick={() => showEmployee(avaliation.id)}>Ver empregado</button>
            <button onClick={() => deleteAvaliation(avaliation.id)}>Deletar avaliação</button>
          </React.Fragment>
        )}
      </div>
    ))
  )

  if (!authToken) {
    return <Redirect to={`/${namespace}/sign_in`} />
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
      <button onClick={() => signOut() }>Sair</button>
      <h1>Avaliações</h1>
      {namespace === 'managers' && (
        <button onClick={() => setRedirectToNew(true)}>Criar empregado</button>
      )}

      {avaliations.length && (
        renderAvaliations()
      )}
    </div>
  )
}

export default IndexContainer;
