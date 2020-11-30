import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import config from '../config';
import './loginpage.css';

var CryptoJS = require("crypto-js");
const cookies = new Cookies();

class Loginpage extends Component {

    loginToAccount() {
        let username = document.getElementById('userNameFormLogin').value;
        let user_password = document.getElementById('passwordFormLogin').value;

        //  Hashing password and username___________________________________
        username = CryptoJS.MD5(username).toString();
        user_password = CryptoJS.MD5(user_password).toString();

        //  Logging into account API Call
        fetch(`${config.DATABASE_API_ENDPOINT}/api/userEndpoint/${username}/${user_password}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json'
            }
        })

        .then(res => {
            if(!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }

            return res.json();
        })

        .then(data => {
            if(data.length === 0) {
                return alert.length('No user with that username and password found. Try again.')
            } else{
                //  normal expire time will be a week with the value of 60*60*24*7
                const expireTime = 60*60*24*7; // This is one minute
                cookies.set('loginToken', data[0].id, {secure: true, maxAge: expireTime});
                cookies.set('account_name', data[1].account_name, {secure: true, maxAge: expireTime});
                alert(`You have logged into ${data[1].account_name}.`)
            }
        })


    }

    render() {
        return(
            <main className="LoginPage">

                <div className="LoginPageHeaderContainer">
                    <Link to='/'><h1>Whats to Eat?</h1></Link>
                </div>

                <div className="userLoginContainer">
                    <h2>Login</h2>

                    <form className='loginForm'>
                        <input className='loginFormInput' id='userNameFormLogin' type='text' placeholder='Username'></input>
                        <input className='loginFormInput' id='passwordFormLogin' type='text' placeholder='Password'></input>
                        
                    </form>

                    <button onClick={() => this.loginToAccount()}>Login</button>

                </div>

            </main>
        )
    }
}

export default Loginpage;