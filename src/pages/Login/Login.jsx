import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom';
import Error404 from '../404Error/Error404'

import AdminLogin from './subComponenets/AdminLogin'
import Signup from './subComponenets/Signup'
import UserLogin from './subComponenets/UserLogin'

export default function Login() {
  return (
    <section className="login-page">
    <Routes>
      <Route path="*" element={<UserLogin/>} />        
      <Route path="/signup" element={<Signup />} />
    </Routes>
      
</section>

  )
}
