import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import './savedRecipes.css';

const cookies = new Cookies();

class SavedRecipes extends Component {

    //  Looks for saved recipes
    checkRecipes() {
        let savedRecipeHTML = [];
        let savedRecipes = this.props.savedRecipes;
        let loginToken = cookies.get('loginToken');

        if(loginToken === undefined) {
            savedRecipeHTML.push(
                <h1>Please Login to view saved recipes.</h1>
            )
        }else {
            for(let i = 0; i < savedRecipes.length; i++) {
                const currentRecipe = savedRecipes[i];
                                
                const currentRecipeId = currentRecipe.id;
                const imageLink = currentRecipe.recipe_image_link;
                const currentRecipeName = currentRecipe.recipe_name;
                const recipeLink = currentRecipe.cooking_instruction_link;
                //const cookTime = currentRecipe.cook_time;
                //const servingSize = currentRecipe.serving_size;
                //const calories = currentRecipe.total_calories;
                const currentAllergies = currentRecipe.allergies;
                const currentIngredients = currentRecipe.ingredients;
                //console.log(currentRecipe, currentRecipe.ingredients)
                
                savedRecipeHTML.push(
                    <div className='savedRecipeContainer' id={currentRecipeId}>

                        <div className='savedRecipeLeftContainer'>

                            <div className='savedRecipeName'>
                                <h1>{currentRecipeName}</h1>
                            </div>

                            <img className='savedRecipeImage' src={imageLink} alt={currentRecipeName}></img>
                            
                            <div className='savedRecipeLink'>
                                <a href={recipeLink} target="_blank" rel="noreferrer">More Recipe Info!</a>
                            </div>

                        </div>

                        <div className='savedRecipeRightContainer'>
                            
                            <div className='savedRecipeIngredients'>

                                <ul className="savedIngredientList">

                                    {/*this.renderSavedIngredients(currentIngredients)*/}
                                    
                                </ul>

                            </div>

                        </div>

                        <button className='savedRecipeDelete' onClick={() => this.props.deleteRecipeFunction(currentRecipeId,currentRecipeName)}>Delete recipe</button>
                    
                    </div>
                )
                
            }
        }

        return savedRecipeHTML;
    }

    renderSavedIngredients(ingredients) {
        let savedIngredientHTML = [];
        
        for(let z=0; z < ingredients.length; z++) {
            
            savedIngredientHTML.push(
                <li className="savedIngredientLI">
                    {ingredients[z]}
                </li>
            )

        }

        return savedIngredientHTML;
        
    }

    renderSavedAllergies() {

    }

    render() {
        return (
            <div className="savedRecipeComponent" id="savedRecipeComponent" style={{display: 'none'}}>
                <h1>Saved Recipes</h1>
                <div className="savedRecipesContainer">
                    {this.checkRecipes()}
                </div>
                
            </div>
            
        )
    }
}

export default SavedRecipes;