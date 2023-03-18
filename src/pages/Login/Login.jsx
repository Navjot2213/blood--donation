import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom';
import Error404 from '../404Error/Error404'

import AdminLogin from './subComponenets/AdminLogin'
import Signup from './subComponenets/Signup'
import UserLogin from './subComponenets/UserLogin'

export default function Login() {
  return (
    <Fragment>
        <h1>hello</h1>
        <Routes>
            <Route path="/" Element={ <UserLogin />}/>
            <Route path="/admin-login" Element={ <AdminLogin />}/>
            <Route path="/signup" Element={ <Signup />}/>
            <Route path="*" Element={ <Error404 />}/>
        </Routes>
    </Fragment>
  )
}
