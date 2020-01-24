import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import {  Redirect } from 'react-router-dom';

const Sidebar = ({setAuthToken}) => {
  const namespace = localStorage.getItem('namespace') || 'managers';
  const [redirectToEmployees, setRedirectToEmployees] = useState(false);
  const [redirectToAvaliations, setRedirectToAvaliations] = useState(false);

  const signOut = () => {
    axios.delete(`/${namespace}/sign_out.json`).then( ({ data }) => {
      localStorage.removeItem('authToken');
      setAuthToken(undefined);
      toast.success('Logout feito com sucesso')
    })
  }

  if (redirectToEmployees) {
    return <Redirect to={`/${namespace}/employees`} />;
  }

  if (redirectToAvaliations) {
    return <Redirect to={`/`} />;
  }

  return (
    <div className="Sidebar">
      {namespace === 'managers' && (
        <button onClick={() => setRedirectToEmployees(true)}>Empregados</button>
      )}
      <button onClick={() => setRedirectToAvaliations(true)}>Avaliações</button>
      <button onClick={() => signOut() }>Sair</button>
    </div>
  )
}

export default Sidebar;