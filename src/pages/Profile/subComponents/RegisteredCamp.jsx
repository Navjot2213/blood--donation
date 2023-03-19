import axios from "axios";
import { useEffect, useState } from "react";

export default function Certificate() {
    const [registerdCamps, setRegisterdCamps] = useState([]);

    useEffect(() => {
      const load = async ()=>{
        const token = localStorage.getItem("token");
        const res = await axios.get(`/user-auth/certificates`, {
         headers: { Authorization: token },
        });
        setRegisterdCamps(res.data.result); 
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
            registerdCamps.map( certi =>{
                const { webinar_name, certificate_id, url, timestamp } = certi;
                const certiDirect = "http://turnip.co.in/Certificates/" + url ;
                const certiLink = "http://turnip.co.in/Certificates/" + url + "/" + certificate_id + ".png";
                const date = new Date(timestamp);
                const DD = date.getDate();
                const MM = date.getMonth();
                const YYYY = date.getFullYear();
                return (
                    <li>
                        <h3>{webinar_name}</h3>
                        <p>Issue Date: {DD}-{MM}-{YYYY}</p>
                        <a href={certiDirect}>
                            <img src={certiLink} height="160" width="240" />
                        </a>
                    </li>    
                );
            })
        }
    </div>
    );
};
