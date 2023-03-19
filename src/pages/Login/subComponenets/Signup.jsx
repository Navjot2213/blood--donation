import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom'

export default function Signup() {
  const [genderOptions] = useState([
    {value: "male", label: "Male"},
    {value: "Female", label: "Female"},
    {value: "TransGender", label: "TransGender"},
  ]);
  const [bloodOptions] = useState([
    {value: "AB+", label: "AB+"},
    {value: "AB-", label: "AB-"},
    {value: "A+", label: "A+"},
    {value: "A-", label: "A-"},
    {value: "B+", label: "B+"},
    {value: "B-", label: "B-"},
    {value: "O+", label: "O+"},
    {value: "O-", label: "O-"},
  ]);
  const [medicalOptions] = useState([
    {value: null, label: "None"},
    {value: "AIDS", label: "AIDS"},
    {value: "DAIBETES", label: "DAIBETES"},
  ])
  const [err, setErr] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const Navigate =  useNavigate();

  const onSubmit = async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const confirmPassword = formData.get('confirmPassword')
    const password= formData.get('password')
    if ( confirmPassword !== password) return setErr("Confirm Password not Match")
    setIsLoading(true)
    if(isLoading) return 
    try {
      const response = await axios.post('https://asia-south1-team-decrypters.cloudfunctions.net/donor-api/registerUser', Object.fromEntries(formData.entries()))
      alert("Details Saved Successfully")
      setIsLoading(false)
      setErr("")
      Navigate('/login')
    } catch (error) {
      setIsLoading(false)
      setErr(error.response.data.msg)
    }
  }

  return (
    <Fragment>
      <form className='login' onSubmit={onSubmit}>
      <h1>Sign-up</h1>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" required/>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
        <label htmlFor="bloodGroup">BloodGroup</label>
        <select name="bloodGroup" id="bloodGroup">
          {bloodOptions.map( ({value , label})=> <option value={value}>{label}</option> )}
        </select>
        <label htmlFor="Medical_Condition">Medical Condition</label>
        <select name="Medical_Condition" id="Medical_Condition" required >
          {medicalOptions.map( ({value , label})=> <option value={value}>{label}</option> )}
        </select>
        <label htmlFor="gender">Gender</label>
        <select name="gender" id="gender" required>
          {genderOptions.map( ({value , label})=> <option value={value}>{label}</option> )}
        </select>
        <label htmlFor="dob">Date Of Birth</label>
        <input type="date" name="dob" id="dob" required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
        <label htmlFor="confirmPassword"> Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" required />

        <input type="submit" value="Register" />
        <h2 id="error">{err}</h2>
        <p>Use Existing Account <Link to='/login'>Login Here</Link></p>
        <p>Login as Admin Account <Link to='/login/admin'>Admin Login Here</Link></p>
      </form>
    </Fragment>
  )
}
