import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Topbar from '../../Topbar';

const MainLayout = ({setAuthToken, children}) => {
  return (
    <div className="MainLayout">
      <Topbar setAuthToken={setAuthToken}/>
      {children}
    </div>
  )
}

export default MainLayout;