import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './loginpage.css';

class Loginpage extends Component {
    render() {
        return(
            <main className="LoginPage">

                <div className="LoginPageHeaderContainer">
                    <Link to='/'><h1>Whats to Eat?</h1></Link>
                </div>

                <div className="userLoginContainer">
                    <h2>Login</h2>

                    <form class='loginForm'>
                        <input class='loginFormInput' id='userNameFormLogin' type='text' placeholder='Username'></input>
                        <input class='loginFormInput' id='passwordFormLogin' type='text' placeholder='Password'></input>
                        <button>Login</button>
                    </form>
                    
                </div>

            </main>
        )
    }
}

export default Loginpage;