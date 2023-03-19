import axios from "axios";
import { useEffect, useState } from "react";

export default function Certificate() {
    const [registerdCamps, setRegisterdCamps] = useState([]);

    useEffect(() => {
      const load = async ()=>{
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://asia-south1-team-decrypters.cloudfunctions.net/camp-api/getRegisteredCamps`, {
         headers: { Authorization: token },
        });
        setRegisterdCamps(res.data); 
      }
      load();
    }, [])
    
    return (
    <div className="registered-camp">
        <h1>Registerd Camps</h1>
        { !registerdCamps.length ? 
            <>
                <h3 style={{ textAlign: "center", color: "#e2665e" }}>You haven't Registerd for any Blood Donation Camp.</h3>
            </>
            :
            registerdCamps.map( camp => {
                const {  _id, campName, location, startTime, endTime } = camp;
                return (
                  <div  key={_id}   id="content">
                  <div className="camp-card">
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
    );
};
