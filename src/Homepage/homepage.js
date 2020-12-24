import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import './homepage.css';

var CryptoJS = require("crypto-js");

//These are environmental variables
const whats_to_eat_endpoint = process.env.REACT_APP_DATABASE_API_ENDPOINT;
//const whats_to_eat_endpoint = 'http://localhost:8000'

//const whats_to_eat_app_url = /'https://whats-to-eat.vercel.app/application'
const whats_to_eat_app_url = 'http://localhost:3000/application'

//const whats_to_eat_app_login_url = 'https://whats-to-eat.vercel.app/loginPage'
const whats_to_eat_app_login_url = 'http://localhost:3000/loginPage'

class HomePage extends Component {

  //Checks if there are cookies for the user and if so it will auto login the user based on the info
  componentDidMount() {
    let checkLoginToken = Cookies.get('loginToken');
    
    if(checkLoginToken !== undefined) {
      window.location = whats_to_eat_app_url;
    }
  }

  //Allows the user to create an account. Error messages will popup if certain conditions are not met
  createAnAccount(){

    let account_name = document.getElementById('nameForm').value;
    let username = document.getElementById('userNameForm').value;
    let user_password = document.getElementById('passwordForm').value;
    let repeated_password = document.getElementById('repeatedPassForm').value;
    let user_email = document.getElementById('userEmail').value;

    //  Verifying login info________________________________________________
    if(account_name === '' || account_name === undefined) {

      document.getElementById('homePageErrorText').innerHTML = 'Missing "Name" input';

      return

    }else if(username === '' || username === undefined) {

      document.getElementById('homePageErrorText').innerHTML = 'Missing "Username" input';

      return

    }else if(user_email === '' || user_email === undefined) {

      document.getElementById('homePageErrorText').innerHTML = 'Missing "Email" input';
      return

    }else if(user_password === '' || user_password === undefined) {

      document.getElementById('homePageErrorText').innerHTML = 'Missing "Password" input';
      return

    }else if(repeated_password === '' || repeated_password === undefined) {

      document.getElementById('homePageErrorText').innerHTML = 'Missing "Repeated Password" input';
      return
    }

    //  Verifying length of Account name
    if(account_name.length < 3 || account_name.length > 15){
      document.getElementById('homePageErrorText').innerHTML = 'Account name must be 3 to 20 characters';
      return
    }

    //  Verifying length of password
    if(user_password.length < 8 || user_password.length > 20) {
      document.getElementById('homePageErrorText').innerHTML = 'Your password must be between 8 and 20 characters';
      return
    }

    //  Verifying length of Account name
    if(username.length < 3 || username.length > 15){
      document.getElementById('homePageErrorText').innerHTML = 'Username name must be 3 to 20 characters';
      return
    }

    //  Verifying the two passwords match_____________________________________
    if(user_password !== repeated_password) {
      document.getElementById('homePageErrorText').innerHTML = "Your passwords don't match.";
      return
    }

    // Hashing Password_________________________________________________________
    username = CryptoJS.MD5(username).toString();
    user_password = CryptoJS.MD5(user_password).toString();


    //  API Call to create an account.
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
      
      window.location = whats_to_eat_app_url;
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

  //  Popup logic to display the app info
  popupDisplay(displayCondition){
    document.getElementById('homePageAppInfoPopupContainer').style.display = displayCondition;
  }

  //  redirects to either login or the app as a guest
  redirectButtons(location) {
    window.location = location
  }

  render() {
    return (
      <main className='HomePage'>
        
        <div className="HomePageHeaderContainer">
            <h1 className="homePageHeader">Whats to Eat?</h1>
        </div>

        <div className="homePageAppInfoPopupContainer" id="homePageAppInfoPopupContainer">
          <div className="homePageAppInfoPopup">

            <div className="homePageAppInfoExitButtonContainer">
              <button className="homePageAppInfoExitButton" onClick={() => this.popupDisplay('none')}>X</button>
            </div>

            <p className="homePageAppInfo">Welcome to Whats to Eat! This tool allows you to quickly search and 
              save recipes that fit your needs. You can add ingredients you want to use, 
              ingredients you want avoid and some allergies and start looking through 
              recipes that fit your needs.</p>
          </div>
        </div>

        <div className="userHomepageContainer">
            
            <div className="moreInfoButtonContainer">
              <button className="moreInfoButton" onClick={() => this.popupDisplay('block')}>About</button>
            </div>
            
            <h2 className="userHomepageHeader">Create an account</h2>

            <form className='loginForm'>
                <input className='loginFormInput' id='nameForm' type='text' placeholder='Name'></input>
                <input className='loginFormInput' id='userNameForm' type='text' placeholder='Username'></input>
                <input className='loginFormInput' id='userEmail' type='text' placeholder='email1234@email.com'></input>
                <input className='loginFormInput' id='passwordForm' type='password' placeholder='Password'></input>
                <input className='loginFormInput' id='repeatedPassForm' type='password' placeholder='Repeat Password'></input>
            </form>

            <div className="homePageErrorContainer">
              <p className="homePageErrorText" id="homePageErrorText"></p>
            </div>

            <div className='userAccountButtons'>
                <button className='createUserButton homePageButton' onClick={() => this.createAnAccount()}>Create Account</button>
                <button className='loginLinkButton homePageButton' onClick={() => this.redirectButtons(whats_to_eat_app_login_url)}>Login here</button>
            </div>

            <div className='noAccountContainer'>
                <h3>Don't want to create an account?</h3>
                <button className='findRecipeButton homePageButton' onClick={() => this.redirectButtons(whats_to_eat_app_url)}>Start searching!</button>
            </div>
        </div>

      </main>
    )
  }
}

export default HomePage;