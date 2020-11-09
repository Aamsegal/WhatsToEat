import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

class HomePage extends Component {
  render() {
    return (
      <main className='HomePage'>
        
        <div className="HomePageHeaderContainer">
            <h1>Whats to Eat?</h1>
        </div>

        <div className="userLoginContainer">
            <h2>Create an account</h2>

            <form class='loginForm'>
                <input class='loginFormInput' id='nameForm' type='text' placeholder='Name'></input>
                <input class='loginFormInput' id='userNameForm' type='text' placeholder='Username'></input>
                <input class='loginFormInput' id='userEmail' type='text' placeholder='email1234@email.com'></input>
                <input class='loginFormInput' id='passwordForm' type='text' placeholder='Password'></input>
                <input class='loginFormInput' id='reapeatedPassForm' type='text' placeholder='Repeat Password'></input>
            </form>

            <div class='userAccountButtons'>
                <button class='createUserButton'>Create Account</button>
                <button class='loginButton'>Have an account? Login here</button>
            </div>

            <div class='noAccountContainer'>
                <h3>Dont want to create an account?</h3>
                <button class='findARecipyButton'><Link to='/application'>Start searching!</Link></button>
            </div>
        </div>

      </main>
    )
  }
}

export default HomePage;