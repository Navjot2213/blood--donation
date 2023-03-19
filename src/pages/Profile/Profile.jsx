import { Route, Routes, NavLink, Link } from "react-router-dom";
import "./Profile.css"
import RegisteredCamp from "./subComponents/RegisteredCamp";
import UserProfile from "./subComponents/UserProfile";

export default function Profile( {setIsLogin } ) {
  const inputSelected = ()=>{
    document.getElementById("slidebar-profile").checked =false;
  } 
  const logoutHandle = ()=>{
    localStorage.clear()
    setIsLogin(false);
  }
    return (
        <section className="profile-page">
        <div className="nav-slidebar-button">
          <input
            type="checkbox"
            id="slidebar-profile"
          />

        <div className="side-bar">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"  viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </div>  
          <h1 style={{fontSize: "2rem"}}>Profile</h1>
          <ul id="lessonsList" onClick={inputSelected}>
            <NavLink activeclassname="active" to="/profile" end><li className="active">General</li></NavLink>
            <NavLink activeclassname="active" to="/profile/registered-camp"><li >Registerd Camps</li></NavLink>
            <Link onClick={logoutHandle} to="/login"><button>Sign-Out</button></Link>
          </ul>
        </div>
        
        <label htmlFor="slidebar-profile">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

        <Routes>
          <Route index element={ <UserProfile/>} />
          <Route path="/registered-camp" element={ <RegisteredCamp />} />
        </Routes>
      </section>
    );

};