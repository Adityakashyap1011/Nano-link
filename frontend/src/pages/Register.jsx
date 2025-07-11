import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/Register.css'
import { useNavigate } from "react-router-dom";


const Home = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [login,setLogin]=useState(false);
    const navigate=useNavigate();

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log('User already exists');
      console.log(token);
      navigate("/dashboard");
    }
  }, []);


    const handleClick= async()=>{
        try{
          const apiEndpoint = login ? "http://localhost:3000/api/auth/login" : "http://localhost:3000/api/auth/register";
          const response=await axios.post(apiEndpoint,{ email ,password});
          localStorage.setItem("token",response.data.token);
          console.log(response.data.token);
          navigate("/dashboard");
        }
        catch(err){
          console.log(err);
        }
    }

  return (
    <div className='auth-container'>
      <h1>{login ?"Login":"Register"}</h1>
      <label>Email :</label>
      <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
      <label>Password :</label>
      <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
      <button onClick={handleClick}>{login ?"Login":"Register"}</button>
          {
            login ?
            (<p>
              Don't have an account?{" "}
              <a onClick={(e)=>{
                e.preventDefault();
                setLogin(false)
              }}>Register</a>
            </p>) :
            (
              <p>
                Already have an account?{" "}
                <a onClick={(e)=>{
                  e.preventDefault(); 
                  setLogin(true)
                }}>Login</a>
              </p>
            )
          }
    </div>
  )
}

export default Home
