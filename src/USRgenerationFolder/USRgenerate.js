import React,{useState} from 'react'
import {FaUser } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
const USRgenerate = () => {
  const [sentences, setMessage] = useState('');
  const [discourse_name, setDiscourseName] = useState('');
  const [showIframe, setShowIframe] = useState(false);
  const [receivedIndex, setReceivedIndex] = useState('');
  window.addEventListener("message", receiveMessage, false);

  const saveChanges = () => {
    const body = {
      sentences:sentences,
      discourse_name:discourse_name
    };
    fetch('http://localhost:9999/usrgenerate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(response => {
        alert("Generated Successfully")
      })
      .then(data => console.log(data))
      .then(setShowIframe(true))
      .catch(error => console.error(error));
  };

  function receiveMessage(event) {
    if(typeof event.data === 'object') {
        setReceivedIndex(event.data.data);
    } else {
        setReceivedIndex(event.data);
    }
    console.log(event.data);
}

  const handleMessageChange = event => {
    setMessage(event.target.value);
  };

 
  // const getData = () => {
  //   setShowIframe(true);
  // }

  const handleDiscourse = event=>{
    setDiscourseName(event.target.value)
    // let discourse_name = event.target.value;
    if(discourse_name.length>255)
    {
      alert("Discourse name length should not be more than 255.");
      event.target.value = '';
    }
    else if (!/^[a-zA-Z0-9_]+$/.test(discourse_name)) {
      alert("Discourse name can only contain letters, numbers, and underscores.");
      event.target.value = ''; // reset the input value
    }
  }

  function handleSubmit(event){
    event.preventDefault();
  }

  return (
    <>
      <nav>
        <NavLink to="/">
          <p>Authoring Interface</p>
        </NavLink>
        <div>
          <ul id="navbar">
            <li>
              <NavLink to="/dashboard">
                <FaUser></FaUser> Username : user1
              </NavLink>
            </li>
            <li>
              <NavLink to="/login">Logout</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <form onSubmit={handleSubmit}>
       
      <p className="lab_discourse">Discourse</p>
        <div className="tta">
          <textarea id="sentences" name="sentences" type="text" onChange={handleMessageChange} ></textarea></div>
          <div className="ttab">
            <div classname="label_discourse" ><p>Enter discourse name:</p></div>
            <input id="discourse_name" name="discourse_name" type="text"  onChange={handleDiscourse} />
        </div>
        <div className="ttab2"><input type='button' name="Save Sentences"  value="Save discourse" disabled={!sentences} /></div>
        <div className="ttab1"><input type='submit' name="Generate USR"  onClick={saveChanges} value="USR Generate" disabled={!sentences} /></div>
        <div style={{ display: showIframe ? 'block' : 'none' }}>
          <iframe className="outl" width="500" height="540" title="sentence" src={`/sentences/?sentence=${sentences}`} />
          <div className="usrtop"><iframe className="usr" width="994px" id="usr" height="540" title="usr" src={`/usr/?receivedindex=${receivedIndex}`} /> </div>
        </div>
      </form>
    </>
  )
};

export default USRgenerate;