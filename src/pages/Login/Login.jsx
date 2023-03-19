import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom';
import './Login.css'
import Error404 from '../404Error/Error404'

import AdminLogin from './subComponenets/AdminLogin'
import Signup from './subComponenets/Signup'
import UserLogin from './subComponenets/UserLogin'

export default function Login(props) {
  return (
    <section className="login-page">
    <Routes>
      <Route index element={<UserLogin {...props}/>} />        
      <Route path="/signup" element={<Signup {...props} />} />
      <Route path="/admin" element={<AdminLogin {...props} />} />
      <Route path="*" element={< Error404/>} />
    </Routes>
      
</section>

  )
}
