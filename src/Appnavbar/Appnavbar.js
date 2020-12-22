import React, { Component } from 'react';
import Cookies from 'js-cookie';
import burgerMenuIcon from '../Images/BurgerMenu.png';
import "./Appnavbar.css";

class Appnavbar extends Component {

    displaySelectedSection(buttonPressed, isMobile) {
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

        if(isMobile === true) {
            document.getElementById('appNavbarBurgerMenu').style.display = 'none';
        }
    }

    //  Checks cookies to see if we have the auth token and account name
    isLoggedIn() {
        let account_name = Cookies.get('account_name');

        if(account_name === undefined || account_name === '') {
            account_name = 'Guest'
        }

        return <div className="appNavbarUsernameContainer">
                <h2 className="appNavbarUsername">Current user: {account_name}</h2>
            </div>
    }

    //  Confirms the user wants to log out then resets the cookies and redirects to the home
    logOut(isMobile) {
        let accountName_Cookie = Cookies.get('account_name');
        let logoutAnswer = window.confirm(`Are you sure you want to log out of ${accountName_Cookie}?`)

        if(logoutAnswer == true) {
            Cookies.remove('account_name');
            Cookies.remove('loginToken');

            if(isMobile === true) {
                console.log('is mobile.')
            }

            window.location = "https://whats-to-eat.vercel.app"

            //window.location = "http://localhost:3000"
        }
    }

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
                    {this.isLoggedIn()}

                    <div className="appNavbarButtonContainer">
                        <button className="appNavbarNavButton" onClick={() => this.displaySelectedSection('recipe')}>Recipe Search</button>
                        <button className="appNavbarNavButton" onClick={() => this.displaySelectedSection('Saved')}>Saved Recipes</button>
                        <button className="appNavbarNavButton" onClick={() => this.logOut()}>Log Out</button>
                    </div>

                    <div className="appNavbarBurgerIcon">
                        <img src={burgerMenuIcon} className="burgerMenuIcon" onClick={() => this.displayMobileAppButtons()}></img>
                    </div>

                    <div className="appNavbarBurgerMenu" id="appNavbarBurgerMenu">

                        <div className="appNavbarBurgerMenuButtonContainer">
                            <button className="appNavbarNavButton" onClick={() => this.displaySelectedSection('recipe', true)}>Recipe Search</button>
                            <button className="appNavbarNavButton" onClick={() => this.displaySelectedSection('Saved', true)}>Saved Recipes</button>
                            <button className="appNavbarNavButton" onClick={() => this.logOut(true)}>Log Out</button>
                        </div>
                        
                    </div>

                </div>

                <div id="appNavbarJumper"></div>
                
            </div>
            
        )
    }
}

export default Appnavbar;