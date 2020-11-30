import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import "./Appnavbar.css";

const cookies = new Cookies();

class Appnavbar extends Component {

    displaySelectedSection(buttonPressed) {
        if(buttonPressed === 'recipe') {

            document.getElementById('recipeSectionComponent').style.display = 'block';
            document.getElementById('savedrecipeComponent').style.display = 'none';
            document.getElementById('userProfileComponent').style.display = 'none';

        }else if (buttonPressed === 'Saved') {
            
            document.getElementById('recipeSectionComponent').style.display = 'none';
            document.getElementById('savedrecipeComponent').style.display = 'block';
            document.getElementById('userProfileComponent').style.display = 'none';

        }else if (buttonPressed === 'Profile'){
            
            document.getElementById('recipeSectionComponent').style.display = 'none';
            document.getElementById('savedrecipeComponent').style.display = 'none';
            document.getElementById('userProfileComponent').style.display = 'block';

        }else {
            return
        }
    }

    //  Checks cookies to see if we have the auth token and account name
    isLoggedIn() {
        let account_name = cookies.get('account_name');

        if(account_name === undefined || account_name === '') {
            account_name = 'Guest'
        }

        return <p className="appNavbarUsername">{account_name}</p>
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
                    <button className="appNavbarNavButton" onClick={() => this.displaySelectedSection('Profile')}>User Profile</button>
                </div>
                
            </div>
            
        )
    }
}

export default Appnavbar;