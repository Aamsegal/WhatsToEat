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

            <form className='loginForm'>
                <input className='loginFormInput' id='nameForm' type='text' placeholder='Name'></input>
                <input className='loginFormInput' id='userNameForm' type='text' placeholder='Username'></input>
                <input className='loginFormInput' id='userEmail' type='text' placeholder='email1234@email.com'></input>
                <input className='loginFormInput' id='passwordForm' type='text' placeholder='Password'></input>
                <input className='loginFormInput' id='reapeatedPassForm' type='text' placeholder='Repeat Password'></input>
            </form>

            <div className='userAccountButtons'>
                <button className='createUserButton'>Create Account</button>
                <button className='loginButton'><Link to='/accountCreation'>Have an account? Login here</Link></button>
            </div>

            <div className='noAccountContainer'>
                <h3>Dont want to create an account?</h3>
                <button className='findArecipeButton'><Link to='/application'>Start searching!</Link></button>
            </div>
        </div>

      </main>
    )
  }
}

export default HomePage;