import { Route, Routes, NavLink, Link } from "react-router-dom";
import "./Admin.css"
import CreateCamp from "./subComponents/CreateCamp";
import CreateNewAdmin from "./subComponents/CreateNewAdmin";

export default function Admin() {
  const inputSelected = ()=>{
    document.getElementById("slidebar-admin").checked = false;
  }
  const logoutHandle = ()=>{
    setIsAdminLogin(false)
    setIsLogin(false)
    localStorage.clear()
  }
    return (
        <section className="admin-page">
        <div className="nav-slidebar-button">
          <input
            type="checkbox"
            id="slidebar-admin"
          />

        <div className="side-bar">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"  viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </div>  
          <h1 style={{fontSize: "2rem"}}>Admin Area</h1>
          <ul id="lessonsList" onClick={inputSelected}>
            <NavLink activeclassname="active" to="/admin" end><li className="active">Create Camp</li></NavLink>
            <NavLink activeclassname="active" to="/admin/createAdmin"><li >Create new Admin</li></NavLink>
            <Link onClick={logoutHandle} to="/login/admin"><button>Sign-Out Admin</button></Link>
          </ul>
        </div>
        
        <label htmlFor="slidebar-admin">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

        <Routes>
            <Route index element={ <CreateCamp/>} />
            <Route path="/createAdmin" element={ <CreateNewAdmin />} />
        </Routes>
      </section>
    );

};
