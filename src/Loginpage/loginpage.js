import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import config from '../config';
import './loginpage.css';

var CryptoJS = require("crypto-js");
const whats_to_eat_endpoint = process.env.REACT_APP_DATABASE_API_ENDPOINT;


class LoginPage extends Component {

    loginToAccount() {        
        let username = document.getElementById('userNameFormLogin').value;
        let user_password = document.getElementById('passwordFormLogin').value;

        //  Checks if the form is empty
        if( username === '') {
            alert('Please provide a username.')
        }else if(user_password === '') {
            alert('Please provide a password.')
        }else {
            //  Hashing password and username___________________________________
            username = CryptoJS.MD5(username).toString();
            user_password = CryptoJS.MD5(user_password).toString();   
            console.log(whats_to_eat_endpoint)         

            //  Logging into account API Call
            fetch(`${whats_to_eat_endpoint}/api/userEndpoint/${username}/${user_password}`, {
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
                if(data.length === 2) {
                    let loginTokenCookie = data[0].id;
                    let accountNameCookie = data[1].account_name;
                    
                    //Cookies.set('loginToken', loginTokenCookie, { expires: 7, secure: true})
                    //Cookies.set('account_name', accountNameCookie, { expires: 7, secure: true});

                    const expireTime = 60*60*24*7   //  Currently set to expire in 7 days

                    document.cookie = `loginToken=${loginTokenCookie}; max-age=${expireTime}; secure`;
                    document.cookie = `account_name=${accountNameCookie}; max-age=${expireTime}; secure`


                    alert(`You have logged into ${accountNameCookie}.`);

                    //  This redirects to this link.
                    //window.location = "https://whats-to-eat.vercel.app/application";
                    window.location = "http://localhost:3000/application";
                }
            
            })

            .catch(error =>{
                //console.log(error)
            })
        }
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