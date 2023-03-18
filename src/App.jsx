import { useState, useEffect, Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css'

import Error404 from './pages/404Error/Error404';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Profile from './pages/Profile/Profile';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import Login from './pages/Login/Login';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (!token) return setIsLogin(false);
      try {
        const verified = await axios.get("/user-auth/verify", {
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
    isLogin
  } 
  return (
    <BrowserRouter>
      <Navbar {...props} />
        <Routes>
            <Route path="/home/*" element={<Home {...props}/>}/>
            <Route path="/search/*" element={<Search {...props}/>}/>

            <Route path="*" element={<Error404/>}/>
            {isLogin ?
              <Fragment>
                <Route path="/profile/*" element={<Profile {...props}/>}/>
              </Fragment>
              :
              <Fragment>
                <Route path="/login/*" element={<Login {...props}/>}/>
              </Fragment>
            }
        </Routes>
      <Footer {...props}/>
    </BrowserRouter >
  );
}

export default App
