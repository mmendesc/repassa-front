import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const NewAvaliation = ({ authToken, match }) => {
  const [comment, setComment] = useState('');
  const [grade, setGrade] = useState(0);
  const [redirectToShow, setRedirectToShow] = useState(false);

  const createAvaliation = () => {
    axios.post(`/managers/avaliations.json`, {
      avaliation: {
        employee_id: match.params.id,
        grade,
        comment,
      }
    }).then( ({ data }) => {
      setRedirectToShow(true)
    })
  }

  if (!authToken) {
    return <Redirect to="/managers/sign_in" />
  }

  if (redirectToShow) {
    return <Redirect to={`/managers/employees/${match.params.id}`} />
  }

  return (
    <div className="NewAvaliation">
      <h1>Create de avaliation</h1>
      <div className="avaliation-form">
        <input type="text" value={comment} onChange={e => setComment(e.target.value)}/>
        <input type="number" value={grade} onChange={e => setGrade(e.target.value)}/>
        <button onClick={createAvaliation}>Adicionar avaliação</button>
      </div>
    </div>
  )
}

export default NewAvaliation;
