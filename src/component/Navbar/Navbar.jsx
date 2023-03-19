import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Nav({ isLogin, isAdminLogin, setIsLogin, setIsAdminLogin }) {

  const inputSelected = ()=>{
    document.getElementById("slidebar-checkbox").checked =false;
  }

  return (
    <header>
      <div className="nav-slidebar-button">
        <input
          type="checkbox"
          id="slidebar-checkbox"
        />

      <div className="logo">
        <Link to="/"><img src='/images/blood-donation.jpg' alt="logo"/></Link>
      </div>

      <ul onClick={inputSelected}>
          <li><Link to="/">
              <p>Home</p>
          </Link></li>
       {isLogin?<>
          <li><Link to="/profile">
            <p>Profile</p>
          </Link></li>
          <li className="signup" onClick={()=>{
            setIsAdminLogin(false)
            setIsLogin(false)
            localStorage.clear()
          }}><Link to="/login">logout</Link></li>
        </>
        :
        <> 
          <li className="signup"><Link to="/login">Login</Link></li>
        </>
        }
      
      </ul>
      
        <label htmlFor="slidebar-checkbox">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

    </header>
  );
}
