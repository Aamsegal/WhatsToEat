import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import config from '../config';

import './homepage.css';

var CryptoJS = require("crypto-js");

const whats_to_eat_endpoint = process.env.REACT_APP_DATABASE_API_ENDPOINT;

class HomePage extends Component {

  componentDidMount() {
    let checkLoginToken = Cookies.get('loginToken');
    
    if(checkLoginToken !== undefined) {
      //window.location = "https://whats-to-eat.vercel.app/application";
      window.location = "http://localhost:3000/application"
    }
  }

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

    fetch(`${whats_to_eat_endpoint}/api/userEndpoint`, {
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
      let loginTokenCookie = data[0];

      Cookies.set('loginToken', loginTokenCookie, { expires: 7, secure: true});
      Cookies.set('account_name', account_name, { expires: 7, secure: true});
      window.alert('Account created. Enjoy!')
      
      //window.location = "https://whats-to-eat.vercel.app/application";
      window.location = "http://localhost:3000/application";
    })
    
    .catch(error => {
      let userNameExistsError = 'insert into "whats_to_eat_user_table" ("account_name", "id", "user_email", "user_password", "username") values ($1, $2, $3, $4, $5) returning * - duplicate key value violates unique constraint "whats_to_eat_user_table_username_key"';

      let userEmailExistsError = 'insert into "whats_to_eat_user_table" ("account_name", "id", "user_email", "user_password", "username") values ($1, $2, $3, $4, $5) returning * - duplicate key value violates unique constraint "whats_to_eat_user_table_user_email_key"';
      
      if(error.message === userNameExistsError) {
        
        document.getElementById('homePageErrorText').innerHTML = "That username is already in use. Please try another";
        document.getElementById('userNameForm').value = "";

      }else if(error.message === userEmailExistsError) {
        document.getElementById('homePageErrorText').innerHTML = "That email is already in use. Please try another";
        document.getElementById('userEmail').value = "";

      }

    })

    
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

            <div className="homePageErrorContainer">
              <p className="homePageErrorText" id="homePageErrorText"></p>
            </div>

            <div className='userAccountButtons'>
                <button className='createUserButton' onClick={() => this.createAnAccount()}>Create Account</button>
                <button className='loginButton'><Link to='/loginPage'>Have an account? Login here</Link></button>
            </div>

            <div className='noAccountContainer'>
                <h3>Don't want to create an account?</h3>
                <button className='findRecipeButton'><Link to='/application'>Start searching!</Link></button>
            </div>
        </div>

        <div className="instructionContainer">
          <h1>Content here</h1>
        </div>

      </main>
    )
  }
}

export default HomePage;