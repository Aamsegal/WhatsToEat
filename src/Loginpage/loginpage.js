import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Cookies from 'universal-cookie';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';

import config from '../config';
import './loginpage.css';

var CryptoJS = require("crypto-js");
//const cookies = new Cookies();

class LoginPage extends Component {

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
                alert('No user with that username and password found. Try again.')
                return res.json().then(e => Promise.reject(e))
            }

            return res.json();
        })

        .then(data => {
            console.log(data)
            let loginTokenCookie = data[0].id;
            let accountNameCookie = data[1].account_name;
            //  normal expire time will be a week with the value of 60*60*24*7
            const expireTime = 60*60*24*7; // This is one minute

            Cookies.set('loginToken', loginTokenCookie, { expires: 7, secure: true,})
            //Cookies.set('loginToken', data[0].id, {expire: 7});
            //Cookies.set('account_name', data[1].account_name, {secure: true, maxAge: expireTime});
            //Cookies.set('chromeCookie', 'it works!', {secure: true, maxAge: expireTime});
            

           //setCookie('loginToken', 'test', {path: '/', secure: true, maxAge: expireTime})

            alert(`You have logged into ${data[1].account_name}.`);

            //  This redirects to this link.
            //window.location = "http://localhost:3000/application";
            console.log(Cookies.get('loginToken'))
        })

        
        //  Redirect to='/application
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

export default LoginPage;