import React, { Component } from 'react';
import Cookies from 'js-cookie';
import burgerMenuIcon from '../Images/BurgerMenu.png';
import "./Appnavbar.css";

class Appnavbar extends Component {

    //Used to choose what sections get displayed, and identifies if its on mobile
    displaySelectedSection(buttonPressed, isMobile) {
        if(buttonPressed === 'Recipe') {

            document.getElementById('recipeSectionComponent').style.display = 'block';
            document.getElementById('savedRecipeComponent').style.display = 'none';

        }else if (buttonPressed === 'Saved') {
            
            document.getElementById('recipeSectionComponent').style.display = 'none';
            document.getElementById('savedRecipeComponent').style.display = 'block';

        }else if (buttonPressed === 'Profile'){
            
            document.getElementById('recipeSectionComponent').style.display = 'none';
            document.getElementById('savedRecipeComponent').style.display = 'none';

        }else {
            return
        }

        if(isMobile === true) {
            document.getElementById('appNavbarBurgerMenu').style.display = 'none';
        }
    }

    //  Checks cookies to see if we have the auth token and account name
    isLoggedInUserName() {
        let account_name = Cookies.get('account_name');

        if(account_name === undefined || account_name === '') {
            account_name = 'Guest'
        
        } 
        
        return <div className="appNavbarUsernameContainer">
                <h2 className="appNavbarUsername">Current user: {account_name}</h2>
            </div>

    }

    //Renders the navbar buttons depending on if someone is logged in
    isLoggedInNavbarButtons() {
        let account_name = Cookies.get('account_name');

        if(account_name === undefined || account_name === '') {
            return <div className="appNavbarButtonContainer">
                <button className="appNavbarNavButton" onClick={() => this.goToHomePage('homepage')}>Homepage</button>
                <button className="appNavbarNavButton" onClick={() => this.goToHomePage('login')}>Login</button>

            </div>
        }else {
            return <div className="appNavbarButtonContainer">
                <button className="appNavbarNavButton" onClick={() => this.displaySelectedSection('Recipe')}>Recipe Search</button>
                <button className="appNavbarNavButton" onClick={() => this.displaySelectedSection('Saved')}>Saved Recipes</button>
                <button className="appNavbarNavButton" onClick={() => this.logOut()}>Log Out</button>
            </div>
        }
    }

    //Renders the navbar buttons depending on if someone is logged in for mobile
    isLoggedInNavbarMobile() {
        let account_name = Cookies.get('account_name');

        if(account_name === undefined || account_name === '') {
            return <div className="appNavbarBurgerMenuButtonContainer">
                <button className="appNavbarNavButton" onClick={() => this.goToHomePage('homepage')}>Homepage</button>
                <button className="appNavbarNavButton" onClick={() => this.goToHomePage('login')}>Login</button>
            </div>
        }else {
            return <div className="appNavbarBurgerMenuButtonContainer">
                <button className="appNavbarNavButton" onClick={() => this.displaySelectedSection('Recipe', true)}>Recipe Search</button>
                <button className="appNavbarNavButton" onClick={() => this.displaySelectedSection('Saved', true)}>Saved Recipes</button>
                <button className="appNavbarNavButton" onClick={() => this.logOut()}>Log Out</button>
            </div>
        }
    }

    //Sends the user to either the homepage or login page depending on the button press
    goToHomePage(destination) {

        if(destination === 'login') {
            window.location = "https://whats-to-eat.vercel.app/loginPage"

        }else if (destination === 'homepage') {
            window.location = "https://whats-to-eat.vercel.app"
        }
        
    }

    //  Confirms the user wants to log out then resets the cookies and redirects to the home
    logOut() {
        let accountName_Cookie = Cookies.get('account_name');
        let logoutAnswer = window.confirm(`Are you sure you want to log out of ${accountName_Cookie}?`)

        if(logoutAnswer == true) {
            Cookies.remove('account_name');
            Cookies.remove('loginToken');

            window.location = "https://whats-to-eat.vercel.app"
        }
    }

    //Shows the burger menu for mobile
    displayMobileAppButtons() {
        document.getElementById('appNavbarBurgerMenu').style.display = 'block';
    }

    render() {
        return (
            <div className="appNavbar" id="appNavbar">

                <div className="appNavbarLeft">
                    <h2 className="appNavbarTitle">Whats to Eat</h2>
                </div>
                
                <div className="appNavbarRight">
                    {this.isLoggedInUserName()}

                    {this.isLoggedInNavbarButtons()}

                    <div className="appNavbarBurgerIcon">
                        <img src={burgerMenuIcon} className="burgerMenuIcon" onClick={() => this.displayMobileAppButtons()}></img>
                    </div>

                    <div className="appNavbarBurgerMenu" id="appNavbarBurgerMenu">

                        {this.isLoggedInNavbarMobile()}
                        
                    </div>

                </div>

                <div id="appNavbarJumper"></div>
                
            </div>
            
        )
    }
}

export default Appnavbar;