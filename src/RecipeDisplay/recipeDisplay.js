import React, { Component } from 'react';

import './recipeDisplay.css';

class recipeDisplay extends Component {

    /*
    state = {
        recipes: this.props.receivedRecipies
    }
    */

    renderBaseInfo() {
        console.log('base info is called')
        let currentRecipeHTML = [];

        if(this.props.currentRecipeProp === undefined) {
            
            currentRecipeHTML.push(
                <div className="emptyPropsChecker">
                    <h1>Start searching for a recipe!</h1>
                </div>
            )
        }else {
            let currentRecipeInfo = this.props.currentRecipeProp.recipe;
            console.log(currentRecipeInfo)

            currentRecipeHTML.push(
                <div className="displayedRecipe">

                    <div className="baseRecipeInfo">
                        <h3 className="displayRecipeName">{currentRecipeInfo.label}</h3>
                        <img src={currentRecipeInfo.image} alt={`${currentRecipeInfo.label} recipe`}/>
                    </div>

                    <div className="nutritionSection">
                        <p className="calories">{`${Math.round(currentRecipeInfo.calories)} Calories`}</p>                        
                        <p className="healthLabel"></p>
                        <p className="servingSize"></p>
                        <p className="ingredients"></p>
                    </div>               
                </div>
            )

            
        }

        return currentRecipeHTML;
        
    }
    
    renderAllergies() {
        console.log('renderAllergies is called')
        
        let allergiesHTML = [];

        if(this.props.currentRecipeProp === undefined) {

            return

        }else {
            
            let allergiesList = this.props.currentRecipeProp.recipe.healthLabels;
            console.log(allergiesList);
            
            for(let i=0; i < allergiesList.length; i++) {
                console.log(allergiesList[i]);
                allergiesHTML.push(
                        <p className="allergyText">{allergiesList[i]}</p>
                )
            }
        }

        return allergiesHTML;
    }

    /*
    renderHealthLabels() {

    }

    renderIngredients() {

    }
    */

    render() {
        return (
            
            <div className='recipeDisplayContainer'>

                <div className="baseRecipeInfo">
                    {this.renderBaseInfo()}
                </div>

                <div className="allergyContainer">
                    {this.renderAllergies()}
                </div>

                <button onClick={() => this.props.nextRecipeFunction()}>Next Recipe</button>

                
            </div>


            
        )
    }
}

export default recipeDisplay;