import React, { Component } from 'react';
import './savedRecipes.css';

import Recipes from './savedRecipeList'; 

class SavedRecipies extends Component {
    //  As of pre server, when im pulling from my custom recipe list, this function
    //itterated through the recipe object and generates html for each recipe and
    //returns all of the htlp to the return call for this component
    checkRecipes() {
        let recipeHTML = [];
        
        for (const key in Recipes) {
            const currentrecipe = Recipes[key];
            const imageLink = currentrecipe.image;
            let recipeName = currentrecipe.name;

            recipeHTML.push(
                <div className='savedrecipe' id={`savedrecipe+${key}+${currentrecipe.name}`}>

                    <div className='savedrecipeImageContainer'>
                        <img className='savedrecipeImage' src={imageLink} alt={recipeName}></img>
                        <button className='savedrecipeDelete'>Delete recipe</button>
                    </div>

                    <div className='savedrecipeInfoContainer'>
                        
                        <div className='savedrecipeName'>
                            <h1>{currentrecipe.name}</h1>
                        </div>
                        

                        <div className='savedrecipeDescription'>
                            <p>{currentrecipe.description}</p>
                        </div>

                    </div>
                </div>
            )
        }

        return recipeHTML;
    }

    render() {
        return (
            <div className="savedrecipeComponent" id="savedrecipeComponent" style={{display: 'none'}}>
                <h1>Saved Recipes</h1>
                <div className="savedRecipesContainer">
                    {this.checkRecipes()}
                </div>
                
            </div>
            
        )
    }
}

export default SavedRecipies;