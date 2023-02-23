import React,{useState} from 'react'
import "./style.css"
import { Navigate, NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import {useNavigate} from "react-router-dom"
import {Redirect} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const [redirectUrl, setRedirectUrl] = useState(null);

  const saveChanges = () => {
    const body = {
      email:email,
      password:password
    };
    fetch('http://localhost:9999/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(response => {
        alert("LoggedIn Successfully")
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  function handleSubmit(event){
    event.preventDefault();
    navigate("/usrgenerate");
  }



  // const navigate = useNavigate();
  return (
    <>
    <Navbar />

    <div class="adcontent">
        <form onSubmit={handleSubmit}>
          <div class="headname"><h1>LOGIN</h1></div>
          <div class="field">
            <label for="email">Email</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" name="email" id='email' onChange={handleEmailChange} required />
          </div>
       
          <div class="field">
            <label for="password">Password</label>
            <input type="password"  name="password" id="password" onChange={handlePasswordChange}/>
          </div>

          <div class="radio">
            <input type="radio" id="author" name="r1" />
            <label for="author">Author</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" id="reviewer" name="r1" />
            <label for="reviewer">Reviewer</label>
          </div>

          <div class="adbutton" > 
          <input type="submit" value="LOG IN" onClick={saveChanges} />
        </div>
        </form>

        <p>Don't have any account?<NavLink to="/signup" >SIGN UP</NavLink></p>
        <br /><br />

      </div>
    </>
  )
}

export default Login