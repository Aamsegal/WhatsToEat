import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import "./Appnavbar.css";

class Appnavbar extends Component {

    displaySelectedSection(buttonPressed) {
        if(buttonPressed === 'recipe') {

            document.getElementById('recipeSectionComponent').style.display = 'block';
            document.getElementById('savedRecipeComponent').style.display = 'none';
            //document.getElementById('userProfileComponent').style.display = 'none';

        }else if (buttonPressed === 'Saved') {
            
            document.getElementById('recipeSectionComponent').style.display = 'none';
            document.getElementById('savedRecipeComponent').style.display = 'block';
            //document.getElementById('userProfileComponent').style.display = 'none';

        }else if (buttonPressed === 'Profile'){
            
            document.getElementById('recipeSectionComponent').style.display = 'none';
            document.getElementById('savedRecipeComponent').style.display = 'none';
            //document.getElementById('userProfileComponent').style.display = 'block';

        }else {
            return
        }
    }

    //  Checks cookies to see if we have the auth token and account name
    isLoggedIn() {
        let account_name = Cookies.get('account_name');

        if(account_name === undefined || account_name === '') {
            account_name = 'Guest'
        }

        return <p className="appNavbarUsername">{account_name}</p>
    }

    //  Confirms the user wants to log out then resets the cookies and redirects to the home
    logOut() {
        let accountName_Cookie = Cookies.get('account_name');
        let logoutAnswer = window.confirm(`Are you sure you want to log out of ${accountName_Cookie}?`)

        if(logoutAnswer == true) {
            Cookies.remove('account_name');
            Cookies.remove('loginToken');

            window.location = "http://localhost:3000"
        }
    }

    render() {
        return (
            <div className="appNavbar">

                <div className="appNavbarLeft">
                    <h2 className="appNavbarTitle">Whats to Eat</h2>
                </div>
                
                <div className="appNavbarRight">
                    {this.isLoggedIn()}
                    <button className="appNavbarNavButton" onClick={() => this.displaySelectedSection('recipe')}>recipe Section</button>
                    <button className="appNavbarNavButton" onClick={() => this.displaySelectedSection('Saved')}>Saved Recipes</button>
                    <button className="appNavbarNavButton" onClick={() => this.logOut()}>Log Out</button>
                </div>
                
            </div>
            
        )
    }
}

export default Appnavbar;