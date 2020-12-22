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
        }else {
            return (
                <div className="recipeInfoContainer">

                
                <div className="baseRecipeInfoContainer">
                        {this.renderBaseInfo()}
                    </div>

                    <div className="ingredientList">
                        <h3 className="searchedHeader">Ingredients</h3>
                        <ul className="ingredientUl"> 
                            {this.renderIngredients()}
                        </ul>
                    </div>

                    <div className="allergyContainer">
                        <h3 className="searchedHeader">Allergies</h3>
                        {this.renderAllergies()}
                    </div>

                    <div className="extraDetailContainer">
                        {this.renderExtraDetail()}
                    </div>

                    <div className="saveRecipeButtonContainer">
                        {this.renderSaveRecipeButton()}
                    </div>

                    <div className="nextRecipeButtonContainer">
                        {this.renderNextButton()}
                    </div>
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
                        <h3 className="displayRecipeName searchedHeader">{currentRecipeInfo.label}</h3>
                        <img src={currentRecipeInfo.image} alt={`${currentRecipeInfo.label} recipe`} className="searchedRecipeImage"/>
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
        let allergiesHTML = [];

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
        let ingredientHTML = [];

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
                <button className="recipeDisplayButton" onClick={() => this.extraCookingLink(recipeInfo.url)}>
                    Cooking Details!
                </button>
            )
        }

        return extraDetailHTML;
    }

    renderSaveRecipeButton() {
        if(this.props.currentRecipeProp === undefined) {
            return
        }else {
            return <button className="saveRecipeButton recipeDisplayButton" onClick={() => this.props.saveRecipeFunction()}>Save!</button>
        }
    }


    renderNextButton() {
        if(this.props.currentRecipeProp === undefined) {
            return
        }else {
            return <button className="nextRecipeButton recipeDisplayButton" onClick={() => this.props.nextRecipeFunction()}>Next Recipe</button>
        }
    }

    extraCookingLink(link) {
        let recipeLinkConfirmation = window.confirm('This will open a link to the recipe. Would you like to continue?');

        if (recipeLinkConfirmation == true) {
            window.open(link, "_blank")
        }
    }

    displayMobileRecipeFilter() {
        document.getElementById('recipeFilterContainer').style.display = 'block';
        document.getElementById('recipeDisplayContainer').style.display = 'none';
    }

    render() {
        return (
            
            <div className='recipeDisplayContainer' id="recipeDisplayContainer">

                <div className='recipeDisplayMobileTransitionContainer'>
                    <button className="recipeSectionTransitionButton" onClick={() => this.displayMobileRecipeFilter()}>{'<'}</button>
                </div>

                <div className="recipeDisplayContainerCenter">

                    <div className="isRecipeSearched">
                        {this.isRecipeSearched()}
                    </div>
                    
                </div>
            </div>


            
        )
    }
}

export default recipeDisplay;