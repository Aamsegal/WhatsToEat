import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Appnavbar.css";

class Appnavbar extends Component {

    displaySelectedSection(buttonPressed) {
        if(buttonPressed === 'Recipy') {

            document.getElementById('recipySectionComponent').style.display = 'block';
            document.getElementById('savedRecipyComponent').style.display = 'none';
            document.getElementById('userProfileComponent').style.display = 'none';

        }else if (buttonPressed === 'Saved') {
            
            document.getElementById('recipySectionComponent').style.display = 'none';
            document.getElementById('savedRecipyComponent').style.display = 'block';
            document.getElementById('userProfileComponent').style.display = 'none';

        }else if (buttonPressed === 'Profile'){
            
            document.getElementById('recipySectionComponent').style.display = 'none';
            document.getElementById('savedRecipyComponent').style.display = 'none';
            document.getElementById('userProfileComponent').style.display = 'block';

        }else {
            return
        }
    }

    render() {
        return (
            <div className="appNavbar">

                <div className="appNavbarLeft">
                    <h2 className="appNavbarTitle">Whats to Eat</h2>
                </div>
                
                <div className="appNavbarRight">
                    <p className="appNavbarUsername">User X</p>
                    <button className="appNavbarNavButton" onClick={() => this.displaySelectedSection('Recipy')}>Recipy Section</button>
                    <button className="appNavbarNavButton" onClick={() => this.displaySelectedSection('Saved')}>Saved Recipes</button>
                    <button className="appNavbarNavButton" onClick={() => this.displaySelectedSection('Profile')}>User Profile</button>
                </div>
                
            </div>
            
        )
    }
}

export default Appnavbar;