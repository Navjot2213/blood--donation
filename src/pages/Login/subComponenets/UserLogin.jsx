import React, { Fragment, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

export default function UserLogin({ setIsLogin }) {
  const [err, setErr] = useState("")
  const Navigate = useNavigate(); 

  const onSubmit = async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    try {
      const response = await axios.post('https://asia-south1-team-decrypters.cloudfunctions.net/donor-api/loginUser', Object.fromEntries(formData.entries()))
      localStorage.setItem('token', response.data.token)
      setIsLogin(true);
      setErr("")
      Navigate('/')
    } catch (error) {
      setErr(error.response.data.msg);
    }
  }
  return (
    <Fragment>
      
      <form className='login' onSubmit={onSubmit}>
      <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
        <input type="submit" value="Login" />
        <h2 id="error">{err}</h2>

        <p>Create New Account <Link to='/login/signup'>Register Here</Link></p>
        <p>Login as Admin Account <Link to='/login/admin'>Admin Login Here</Link></p>
      </form>       

    </Fragment>
  )
}
