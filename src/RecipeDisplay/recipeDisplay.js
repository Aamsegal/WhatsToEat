import React, { Component } from 'react';

import './recipeDisplay.css';

class recipeDisplay extends Component {

    isRecipeSearched() {
        if(this.props.currentRecipeProp === undefined) {
            return (
                <div className="emptyPropsChecker">
                    <h1>Start searching for a recipe!</h1>
                </div>
            )
        }
    }

    renderBaseInfo() {
        let currentRecipeHTML = [];

        if(this.props.currentRecipeProp === undefined) {
            return
        }else {
            let currentRecipeInfo = this.props.currentRecipeProp.recipe;

            currentRecipeHTML.push(
                <div className="displayedRecipe">

                    <div className="baseRecipeInfo">
                        <h3 className="displayRecipeName">{currentRecipeInfo.label}</h3>
                        <img src={currentRecipeInfo.image} alt={`${currentRecipeInfo.label} recipe`}/>
                    </div>

                    <div className="nutritionSection">
                        <p className="servingSize">{`Serving Size: ${currentRecipeInfo.yield}`}</p>
                        <p className="calories">{`Calories per serving: ${Math.round((currentRecipeInfo.calories)/currentRecipeInfo.yield)}`}</p>                        
                        <p className="cookTime">{`Cook Time: ${currentRecipeInfo.totalTime} minutes`}</p>
                    </div>               
                </div>
            )

            
        }

        return currentRecipeHTML;
        
    }
    
    renderAllergies() {     
        let allergiesHTML = [<h3>Allergy Info</h3>];

        if(this.props.currentRecipeProp === undefined) {

            return

        }else {
            
            let allergiesList = this.props.currentRecipeProp.recipe.healthLabels;
            
            for(let i=0; i < allergiesList.length; i++) {
                allergiesHTML.push(
                        <p className="allergyText">{allergiesList[i]}</p>
                )
            }
        }

        return allergiesHTML;
    }

    renderIngredients() {
        let ingredientHTML = [<h3>Ingredients</h3>];

        if(this.props.currentRecipeProp === undefined) {
            return
        }else {

            let ingredientList = this.props.currentRecipeProp.recipe.ingredientLines;

            for(let i=0; i < ingredientList.length; i++) {
                ingredientHTML.push(
                    <li className={`ingredientLi-Id=${i}`}>{ingredientList[i]}</li>
                )
            }

        }

        return ingredientHTML;
    }

    renderExtraDetail() {
        let extraDetailHTML = [];

        if(this.props.currentRecipeProp === undefined) {
            return
        }else {
            let recipeInfo = this.props.currentRecipeProp.recipe;

            extraDetailHTML.push(
                <a className="recipeLink" href={recipeInfo.url} target="_blank" rel="noreferrer">Cooking Details!</a>
            )
        }

        return extraDetailHTML;
    }

    renderNextButton() {
        if(this.props.currentRecipeProp === undefined) {
            return
        }else {
            return <button className="nextRecipeButton" onClick={() => this.props.nextRecipeFunction()}>Next Recipe</button>
        }
    }

    render() {
        return (
            
            <div className='recipeDisplayContainer'>

                <div className="isRecipeSearched">
                    {this.isRecipeSearched()}
                </div>

                <div className="baseRecipeInfoContainer">
                    {this.renderBaseInfo()}
                </div>

                <div className="ingredientList">
                    <ul className="ingredientUl">
                        {this.renderIngredients()}
                    </ul>
                </div>

                <div className="allergyContainer">
                    {this.renderAllergies()}
                </div>

                <div className="extraDetailContainer">
                    {this.renderExtraDetail()}
                </div>

                <div className="nextRecipeButtonContainer">
                    {this.renderNextButton()}
                </div>
                
            </div>


            
        )
    }
}

export default recipeDisplay;