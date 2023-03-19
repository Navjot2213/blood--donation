import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './ContactDonors.css'

export default function ContactDonors() {
    const [donors, setDonors] = useState([]);
    const [filteredDonors, setFilteredDonors] = useState([]);
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

    useEffect(() => {
        const load = async () => {
            try {
                const response = await axios.get("https://asia-south1-team-decrypters.cloudfunctions.net/donor-api/getDonor")
                setDonors(response.data);
                setFilteredDonors(response.data)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        load()
    }, [])

    const onSelect = (e)=>{
        const {value} = e.target
        setFilteredDonors( donors.filter( (donors)=> {
            return (  value == '' ? true: donors.bloodGroup == value );
          })
        );  
    }
    return (
        <section id="contact-donors">
            <section id="filters">
                <h2>Filters</h2>
                <label>Select States</label>
                <select onChange={onSelect}>
                    <option value="">All</option>
                    {bloodOptions.map( ({value, label}) => <option key={value} value={value}>{label}</option>)}
                </select>
            </section>
            <h2> Contact Donors </h2>
            <div className="table-flex">
                <div className="tabel-thead">
                    <div className="td"> Name </div>
                    <div className="td-flex">Email</div>
                    <div className="td-flex">Blood Group</div>
                    <div className="td-last justify-content-center">Contact</div>
                </div>
            </div>
            {
                filteredDonors.map(donor => {
                    const { name, email, bloodGroup } = donor;
                    const maskedEmail = email.replace(/^.{0,8}/, '********')
                    return (
                        <div key={email} className="table-tbody mt-2">
                            <div className="td">{name}</div>
                            <div className="td-flex">{maskedEmail}</div>
                            <div className="td-flex">{bloodGroup}</div>
                            <div className="td-last justify-content-end">
                                <button style={{ margin: 0 }} type="button">Contact</button>
                            </div>
                        </div>
                    );
                })
            }

        </section>
    )
}
