import axios from 'axios'
import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function AdminLogin({ setIsAdminLogin }) {
  const [err, setErr] = useState("")
  const Navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    try {
      const response = await axios.post('https://asia-south1-team-decrypters.cloudfunctions.net/admin-api/loginAdmin', Object.fromEntries(formData.entries()))
      localStorage.setItem('Admintoken', response.data.token)
      setErr("")
      setIsAdminLogin(true)
      Navigate('/admin')
    } catch (error) {
      setErr(error.response.data.msg)
    }
  }

  return (
    <Fragment>
      
      <form className='login' onSubmit={onSubmit}>
      <h1>Admin Login</h1>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required/>
        <input type="submit" value="Login" />
        <h2 id="error">{err}</h2>
        <p>Use Existing Account <Link to='/login'>Login Here</Link></p>
        <p>Create New Account <Link to='/login/signup'>Register Here</Link></p>
      </form>
    </Fragment>
  )
}
