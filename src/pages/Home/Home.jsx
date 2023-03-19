import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import './Home.css'

import Error404 from '../404Error/Error404'


export default function Home({ isLogin }) {
  const Navigate = useNavigate();
  const [camps, setCamps] = useState([]);

  useEffect( ()=>{
    const load =  async ()=>{
      try {
        const response = await axios.get('https://asia-south1-team-decrypters.cloudfunctions.net/camp-api/getCampsLists')
        setCamps(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    load()
  },[])

  const registerCamp = (campId) => async()=>{
    if(!isLogin) {
      return confirm("Please Login First Before Registarting in Camp") ? Navigate('/login'): null;
    }console.log(campId)
  }
  return (
    <section className="home-page">
      <section id="camps">
      { camps.map( camp => {
            const {  _id, campName, location, startTime, endTime } = camp;
            const RemaingsDay =  Math.floor( (new Date(endTime) - Date.now())/86400000 ) + 1;
            return (
              <div id="content">
              <div onClick={ registerCamp(_id)} className="camp-card">
                  <div className="content">
                    <h3>{campName}</h3>
                    <p>Location: {location}</p>
                    <p>End In: {RemaingsDay} Days</p>
                    <div className="card-footer">
                      <button>Be Helping One <span>&rarr;</span></button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </section>
      

{/*       <form>
        <select name="location" id="location">
          {bloodOptions.map( ({value , label})=> <option value={value}>{label}</option> )}
        </select>
      </form> */}
    </section>

  )
}
