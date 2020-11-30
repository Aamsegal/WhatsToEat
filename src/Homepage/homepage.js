import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

import config from '../config';

import './homepage.css';


var CryptoJS = require("crypto-js");

const cookies = new Cookies();

class HomePage extends Component {

  createAnAccount(){

    let account_name = document.getElementById('nameForm').value;
    let username = document.getElementById('userNameForm').value;
    let user_password = document.getElementById('passwordForm').value;
    let repeated_password = document.getElementById('repeatedPassForm').value;
    let user_email = document.getElementById('userEmail').value;

    //  Verifying login info________________________________________________
    if(account_name === '' || account_name === undefined) {

      alert('Missing "Name" input')
      return

    }else if(username === '' || username === undefined) {

      alert('Missing "Username" input')
      return

    }else if(user_email === '' || user_email === undefined) {

      alert('Missing "Email" input')
      return

    }else if(user_password === '' || user_password === undefined) {

      alert('Missing "Password" input')
      return

    }else if(repeated_password === '' || repeated_password === undefined) {

      alert('Missing "Repeated Password" input')
      return
    }

    //  Verifying the two passwords match_____________________________________
    if(user_password !== repeated_password) {
      alert('Your passwords dont match.')
      
      return
    }

    // Hashing Password_________________________________________________________
    username = CryptoJS.MD5(username).toString();
    user_password = CryptoJS.MD5(user_password).toString();


    //  API Call_______________________________________________________________
    const newUserInfo = {account_name, username, user_password, user_email};

    fetch(`${config.DATABASE_API_ENDPOINT}/api/userEndpoint`, {
      method: 'POST',
      body: JSON.stringify(newUserInfo),
      headers: {
        'content-type': 'application/json'
      }
    })

    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }

      return res.json()
    })

    .then(data => {

      //  normal expire time will be a week with the value of 60*60*24*7
      const expireTime = 60*60*24*7; // This is one minute
      cookies.set('loginToken', data[0], {secure: true, maxAge: expireTime});
      window.alert('Account created. Enjoy!')
    })
    
    //.catch(error)

    return <Redirect to='/application'/>
  }

  render() {
    return (
      <main className='HomePage'>
        
        <div className="HomePageHeaderContainer">
            <h1>Whats to Eat?</h1>
        </div>

        <div className="userLoginContainer">
            <h2>Create an account</h2>

            <form className='loginForm'>
                <input className='loginFormInput' id='nameForm' type='text' placeholder='Name'></input>
                <input className='loginFormInput' id='userNameForm' type='text' placeholder='Username'></input>
                <input className='loginFormInput' id='userEmail' type='text' placeholder='email1234@email.com'></input>
                <input className='loginFormInput' id='passwordForm' type='text' placeholder='Password'></input>
                <input className='loginFormInput' id='repeatedPassForm' type='text' placeholder='Repeat Password'></input>
            </form>

            <div className='userAccountButtons'>
                <button className='createUserButton' onClick={() => this.createAnAccount()}>Create Account</button>
                <button className='loginButton'><Link to='/loginPage'>Have an account? Login here</Link></button>
            </div>

            <div className='noAccountContainer'>
                <h3>Don't want to create an account?</h3>
                <button className='findArecipeButton'><Link to='/application'>Start searching!</Link></button>
            </div>
        </div>

      </main>
    )
  }
}

export default HomePage;