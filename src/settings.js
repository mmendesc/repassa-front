import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:3001/api/v1';

export const defaultErrorHandler = (error) => {
  if (error.response.status === 401) {
    toast('não autorizado')
    localStorage.removeItem('authToken')
    return <Redirect to="/" />;
  }
}