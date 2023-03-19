import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function UserProfile() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        bloodGroup: "",
        Medicsl_Cond: "",
    });

    useEffect(() => {
        const loadDetails = async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(`/user-auth/details`, {
                headers: { Authorization: token },
            });
            setUser( res.data);
          }
          loadDetails();
    }, []);
 
    return (
    <div className="profile">
        <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
        </div> 
        <div className="info">
            <h3>Name: </h3><input name="name" required  disabled value={user.name} />
        </div>
        <div className="info">
            <h3>Email: </h3><input name="email" disabled value={user.email} />
        </div>
        <div className="info">    
            <h3>bloodGroup: </h3><input name="organisation" disabled value={user.bloodGroup}/>
        </div>
        <div className="info">    
            <h3>Main Disease: </h3><input name="organisation" disabled value={user.Medicsl_Cond}/>
        </div>
    </div>
    );
};
