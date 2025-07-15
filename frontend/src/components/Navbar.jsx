import React from 'react'
import '../styles/Navbar.css'
import { useNavigate } from "react-router-dom";


const Navbar = () => {

const navigate = useNavigate();
  const handleClick=()=>{
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className='navbar'>
      <h2>URL Shortener Dashboard </h2>
      <button className='nav-btn' onClick={handleClick}>Logout</button>
    </div>
  )
}

export default Navbar
