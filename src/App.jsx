import { useState, useEffect, Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css'

import Error404 from './pages/404Error/Error404';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import Camp from './pages/Camps/Camps';
import ContactDonors from './pages/ContactDonors/ContactDonors';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setIsLogin(false);
      try {
        const verified = await axios.get("https://asia-south1-team-decrypters.cloudfunctions.net/donor-api/verifiedToken", {
          headers: { Authorization: token },
        });
        verified.data ? setIsLogin(verified.data) :  localStorage.clear();
      } catch (error) {
        console.log(error)
        localStorage.clear();
      };
    }
    checkLogin();
  }, []);

  const props = {
    isLogin,
    setIsLogin,
    isAdminLogin,
    setIsAdminLogin
  } 
  return (
    <BrowserRouter>
      <Navbar {...props} />
        <Routes>
            <Route index element={<Home {...props}/>}/>
            <Route path="/camps/*" element={<Camp {...props}/>}/>
            <Route path="/contact-donors/*" element={<ContactDonors {...props}/>}/>
            {isLogin ?
              <Fragment>
                <Route path="/profile/*" element={<Profile {...props}/>}/>
              </Fragment>
              :
              <Fragment>
                <Route path="/login/*" element={<Login {...props}/>}/>
              </Fragment>
            }
            {
              isAdminLogin && 
              <Fragment>
                <Route path="/admin/*" element={<Admin {...props}/>}/>
              </Fragment>
            }
            <Route path="*" element={<Error404/>}/>
        </Routes>
      <Footer {...props}/>
    </BrowserRouter >
  );
}

export default App
