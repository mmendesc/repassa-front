import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './style.scss';

const Avaliations = ({ avaliations, showActions, setAvaliations }) => {
  const [redirectToShow, setRedirectToShow] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(undefined);

  const showEmployee = employeeId => {
    setCurrentEmployee(employeeId)
    setRedirectToShow(true)
  }

  const deleteAvaliation = (avaliationId) => {
    axios.delete(`/managers/avaliations/${avaliationId}.json`).then( ({ data }) => {

      setAvaliations(avaliations.filter(avaliation => avaliation.id !== avaliationId));
    })
  }

  if (redirectToShow) {
    return <Redirect to={`/managers/employees/${currentEmployee}`} />
  }

  return (
    <div className="Avaliations">
      {avaliations.map(avaliation => (
        <div className="avaliation">
          <h4>{`Empregado: ${avaliation.attributes.employee.data.attributes.name}`}</h4>
          <span>{`Nota: ${avaliation.attributes.grade}`}</span>
          <span>{`Comentário: ${avaliation.attributes.comment}`}</span>
          <span>{`Avaliador por: ${avaliation.attributes.manager.data.attributes.name}`}</span>
          {showActions && (
            <div className="avaliation-actions">
              <button onClick={() => showEmployee(avaliation.attributes.employee.data.id)}>Ver empregado</button>
              <button onClick={() => deleteAvaliation(avaliation.id)}>Deletar avaliação</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
};

export default Avaliations;