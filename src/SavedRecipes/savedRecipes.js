import React, { Component } from 'react';
import './savedRecipes.css';

import Recipes from './savedRecipyList'; 

class SavedRecipies extends Component {
    //  As of pre server, when im pulling from my custom recipy list, this function
    //itterated through the recipy object and generates html for each recipy and
    //returns all of the htlp to the return call for this component
    checkRecipes() {
        let recipyHTML = [];
        
        for (const key in Recipes) {
            const currentRecipy = Recipes[key];
            const imageLink = currentRecipy.image;

            recipyHTML.push(
                <div className='savedRecipy' id={`savedRecipy+${key}+${currentRecipy.name}`}>

                    <div className='savedRecipyImageContainer'>
                        <img className='savedRecipyImage' src={imageLink}></img>
                        <button className='savedRecipyDelete'>Delete Recipy</button>
                    </div>

                    <div className='savedRecipyInfoContainer'>
                        
                        <div className='savedRecipyName'>
                            <h1>{currentRecipy.name}</h1>
                        </div>
                        

                        <div className='savedRecipyDescription'>
                            <p>{currentRecipy.description}</p>
                        </div>

                    </div>
                </div>
            )
        }

        return recipyHTML;
    }

    render() {
        //console.log(Recipies)
        return (
            <div className="savedRecipyComponent" id="savedRecipyComponent" style={{display: 'none'}}>
                <h1>SavedRecipies</h1>
                <div className="savedRecipesContainer">
                    {this.checkRecipes()}
                </div>
                
            </div>
            
        )
    }
}

export default SavedRecipies;