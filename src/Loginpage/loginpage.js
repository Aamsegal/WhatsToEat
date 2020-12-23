import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './loginpage.css';

var CryptoJS = require("crypto-js");
const whats_to_eat_endpoint = process.env.REACT_APP_DATABASE_API_ENDPOINT;


class LoginPage extends Component {

    //  Checks if there is a user with the information presented and if so it saved the login token which use used for all api calls
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

                    const expireTime = 60*60*24*7   //  Currently set to expire in 7 days

                    document.cookie = `loginToken=${loginTokenCookie}; max-age=${expireTime}; secure`;
                    document.cookie = `account_name=${accountNameCookie}; max-age=${expireTime}; secure`


                    alert(`You have logged into ${accountNameCookie}.`);

                    //  This redirects to this link.
                    window.location = "https://whats-to-eat.vercel.app/application";
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
                    <Link to='/' className="loginPageLinkTo" style={{textDecoration: 'none'}}><h1 className="loginPageHeader">Whats to Eat?</h1></Link>
                </div>

                <div className="userLoginContainer">
                    <h2 className="userLoginHeader">Login</h2>

                    <form className='loginForm'>
                        <input className='loginFormInput' id='userNameFormLogin' type='text' placeholder='Username'></input>
                        <input className='loginFormInput' id='passwordFormLogin' type='text' placeholder='Password'></input>
                        
                    </form>

                    <button onClick={() => this.loginToAccount()} className="loginButton">Login</button>

                </div>

            </main>
        )
    }
}

export default LoginPage;