import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/api/v1';

const IndexContainer = () => {

  return (
    <div className="IndexContainer">
      <h1>Logou</h1>
    </div>
  )
}

export default IndexContainer;
