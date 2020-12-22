import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import './savedRecipes.css'

const cookies = new Cookies();

class SavedRecipes extends Component {

    state = {
        userRecipes: []
    }
    
    
    componentDidUpdate(prevProps) {

        if(prevProps.savedRecipes !== this.props.savedRecipes) {
            
            setTimeout(() => {
                this.setState({
                    userRecipes: this.props.savedRecipes
                })
            }, 750)
            
          }
    }
    
    //  Looks for saved recipes
    checkRecipes() {
        let savedRecipeHTML = [];
        let savedRecipes = this.state.userRecipes;

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
                const cookTime = currentRecipe.cook_time;
                const servingSize = currentRecipe.serving_size;
                const calories = currentRecipe.total_calories;
                const currentAllergies = currentRecipe.allergies;
                const currentIngredients = currentRecipe.ingredients;
                
                savedRecipeHTML.push(
                    <div className='singleSavedRecipeContainer' id={currentRecipeId} key={currentRecipeId}>
                        <div className="singleSavedRecipeCenter">

                        
                            <div className='savedRecipeName'>
                                <h1>{currentRecipeName}</h1>
                            </div>

                            <div className='savedRecipeLeftContainer'>

                                <img className='savedRecipeImage' src={imageLink} alt={currentRecipeName}></img>
                                
                                <div className='savedRecipeLink'>
                                    <p className="savedRecipeCookTime">Cook Time: {cookTime} minutes</p>
                                    <p className="savedRecipeServingSize">Serving size: {servingSize}</p>
                                    <p className="savedRecipeCalories">Total calories: {calories}</p>
                                    <button className="savedRecipeButtons" onClick={() => this.savedExtraCookingLink(recipeLink)}>More Recipe Info!</button>
                                </div>

                            </div>

                            <div className='savedRecipeRightContainer'>
                                
                                <div className='savedRecipeIngredients'>
                                    <h2 className="savedRecipeListHeader">Ingredients</h2>
                                    <ul className="savedIngredientList">

                                        {this.renderSavedIngredients(currentIngredients)}
                                        
                                    </ul>

                                </div>

                                <div className='savedAllergiesContainer'>

                                    <h2 className="savedRecipeListHeader">Allergies</h2>

                                    <ul className="savedAllergiesList">

                                        {this.renderSavedAllergies(currentAllergies)}

                                    </ul>

                                </div>

                            </div>

                            <div className="deleteSavedContainer">
                                <button className='savedRecipeDelete savedRecipeButtons' onClick={() => this.props.deleteRecipeFunction(currentRecipeId,currentRecipeName)}>Delete recipe</button>
                            </div>
                        </div>
                    </div>
                )
                
            }
        }

        return savedRecipeHTML;
    }

    //  Renders the saved ingredient html
    renderSavedIngredients(ingredients) {

        let savedIngredientHTML = [];

        if(ingredients !== undefined) {        
            for(let z=0; z < ingredients.length; z++) {
                
                savedIngredientHTML.push(
                    <li className="savedIngredientLI">
                        {ingredients[z]}
                    </li>
                )
            }
        }

        return savedIngredientHTML;
        
    }

    //  Renders the allergy html
    renderSavedAllergies(allergies) {

        let savedAllergiesHTML = [];

        if(allergies !== undefined) {

            for(let y=0; y < allergies.length; y++) {

                savedAllergiesHTML.push(
                    <li className="savedAllergiesLI">
                        {allergies[y]}
                    </li>
                )
            }
        }

        return savedAllergiesHTML;
    }

    savedExtraCookingLink(link) {
        let savedLinkConfirmation = window.confirm('This will open a link to the recipe. Would you like to continue?');

        if (savedLinkConfirmation == true) {
            window.open(link, "_blank")
        }
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