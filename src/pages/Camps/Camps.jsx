import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import './Camps.css'

export default function Camps({ isLogin }) {
  const Navigate = useNavigate();
  const [activecamps, setActiveCamps] = useState([]);
  const [previousCamp, setPreviousCamps] = useState([]);
  const [camps, setCamps] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect( ()=>{
    const load =  async ()=>{
      try {
        const response = await axios.get('https://asia-south1-team-decrypters.cloudfunctions.net/camp-api/getCampsLists')
        setCamps(response.data)
        setActiveCamps(response.data.filter( (value)=> {
            return (new Date(value.endTime) - Date.now()) > 0;
          })
        );
        setPreviousCamps( response.data.filter( value => {
            return (new Date(value.endTime) - Date.now()) <= 0 
            }) 
        );
        setLocations( Array.from( new Set( response.data.map( value => value.location)) ))
      } catch (error) {
        console.log(error)
      }
    }
    load()
  },[])

  const registerCamp = (campId) => async()=>{
    if(!isLogin) {
      return confirm("Please Login First Before Registarting in Camp") ? Navigate('/login'): null;
    }
    const token = localStorage.getItem('token')
    try {
        const response = await axios.patch("https://asia-south1-team-decrypters.cloudfunctions.net/camp-api/donorRegisterted/"+ campId, {}, {
            headers: { Authorization : token}
        })
        alert(response.data.msg)
    } catch (error) {
        alert(error.response.data.msg)
    }

  }

  const onSelect = (e)=>{
    const {value} = e.target
    setActiveCamps( camps.filter( (camp)=> {
        return ( (new Date(camp.endTime) - Date.now()) > 0 ) && ( value == '' ? true: camp.location == value );
      }))

    setPreviousCamps( camps.filter( (camp) =>{
        return ( (new Date(camp.endTime) - Date.now()) <= 0 ) &&  (value == '' ? true: camp.location == value) 
    })
    )
  }
  return (
    <section className="camp-page">
        <section id="filters">
        <h2>Filters</h2>
            <label>Select States</label>
            <select onChange={onSelect}>
                <option value="">All</option>
                {locations.map( value => <option key={value} value={value}>{value}</option> )}
            </select>
        </section>
      <section id="activeCamp">
      <h2>Active Blood Donations Camps</h2>
      <div id="camps">
      { activecamps.map( camp => {
            const {  _id, campName, location, startTime, endTime } = camp;
            return (
              <div  key={_id}   id="content">
              <div onClick={ registerCamp(_id)} className="camp-card">
                  <div className="content">
                    <h3>{campName}</h3>
                    <p>Location: {location}</p>
                    <p>Start Date: {new Date(startTime).toLocaleDateString('en-IN')}</p>
                    <p>End Date: {new Date(endTime).toLocaleDateString('en-IN')}</p>
                    <div className="card-footer">
                      <button>Be Helping One <span>&rarr;</span></button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }        
      </div>
      </section>
      <section id="activeCamp">
      <h2>Previous Blood Donations Camps</h2>
      <div id="camps">
      { previousCamp.map( camp => {
            const {  _id, campName, location, startTime, endTime, donors } = camp;
            return (
              <div  key={_id}  id="content">
              <div className="camp-card">
                  <div className="content">
                    <h3>{campName}</h3>
                    <p>Location: {location}</p>
                    <p>Start Date: {new Date(startTime).toLocaleDateString('en-IN')}</p>
                    <p>End Date: {new Date(endTime).toLocaleDateString('en-IN')}</p>
                    <div className="card-footer">
                      <button>Total Donations: {donors.length}</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }        
      </div>
      </section>
    </section>

  )
}
