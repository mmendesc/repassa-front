import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { defaultErrorHandler } from '../../settings';
import './style.scss';

const IndexContainer = ({ authToken }) => {
  const [avaliations, setAvaliations] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(undefined);
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

  const renderAvaliations = () => (
    avaliations.map(avaliation => (
      <div className="avaliation">
        <h4>{`Empregado: ${avaliation.attributes.employee.data.attributes.name}`}</h4>
        <span>{`Nota: ${avaliation.attributes.grade}`}</span>
        <span>{`Comentário: ${avaliation.attributes.comment}`}</span>
        <span>{`Avaliador por: ${avaliation.attributes.manager.data.attributes.name}`}</span>
        {namespace === 'managers' && (
          <div className="avaliation-actions">
            <button onClick={() => showEmployee(avaliation.attributes.employee.data.id)}>Ver empregado</button>
            <button onClick={() => deleteAvaliation(avaliation.id)}>Deletar avaliação</button>
          </div>
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

      <h1>Avaliações</h1>
      {namespace === 'managers' && (
        <button onClick={() => setRedirectToNew(true)}>Criar empregado</button>
      )}

      {avaliations.length && (
        <div className="avaliations">
          {renderAvaliations()}
        </div>
      )}
    </div>
  )
}

export default IndexContainer;
