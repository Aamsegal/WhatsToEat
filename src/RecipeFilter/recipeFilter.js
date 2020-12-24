import React, { Component } from 'react';

import './recipeFilter.css';

class recipeFilter extends Component {

    state ={
        ingredients: [],
        excludedIngredients: [],
    }

    //    Saves the value of the ingredient text box. Then copys the ingredients state
    //and adds the new ingredient before re-saving the state
    addIngredient() {
        let ingredient = document.getElementById('ingredients').value;

        if(ingredient === '') {
            alert('No ingredient added.');
        }else {
            let currentIngredients = this.state.ingredients;
            currentIngredients.push(ingredient);

            this.setState({ingredients: currentIngredients})
            document.getElementById('ingredients').value = '';
        }
        

    }

    //      Goes through all the ingredients in the ingredient state and generates
    //html for each ingredient. Also links the delete button to the ingredient
    renderAllIngredients() {
        let ingredientHtml = [];
        let ingredientList = this.state.ingredients;

        for(let i = 0; i < ingredientList.length; i++) {
            ingredientHtml.push(
                <div className="addedIngredient" id={`${ingredientList[i]}+${i}`} key={`${ingredientList[i]}+${i}`}>
                    
                    <div className="ingredientText">
                        <p className="ingredientQueryText">{ingredientList[i]}</p>
                    </div>

                    <div className="ingredientX">
                        <button onClick={() => this.deleteIngredient(i)} className="deleteIngredientButton">X</button>
                    </div>
                </div>
                
                
            )
        }

        return ingredientHtml;
    }

    //      Takes the index of the ingredient and then removes it from the ingredient
    //state.
    deleteIngredient(ingredientId) {
        let ingredients = this.state.ingredients;

        ingredients.splice(ingredientId,1);

        this.setState({ingredients: ingredients})

    }

    // Exclude methods bellow__________________________________________________________________

    //  This function takes the ingredient and add is to the excluded variable in the api call
    excludeIngredient() {
        let excludedIngredient = document.getElementById('ingredients').value;

        if(excludedIngredient === '') {
            alert('No ingredient to exclude.');
        }else {
            let currentIngredients = this.state.excludedIngredients;
            currentIngredients.push(excludedIngredient);

            this.setState({excludedIngredients: currentIngredients});
            document.getElementById('ingredients').value = '';
        }
    }


    //  Renders the excluded ingredients in the same way that the included ingredients are.
    renderExcludedIngredients() {
        let excludedHtml = [];
        let excludedList = this.state.excludedIngredients;

        for(let i = 0; i < excludedList.length; i++) {
            excludedHtml.push(
                <div className="excludedIngredient" id={`${excludedList[i]}+${i}`} key={`${excludedList[i]}+${i}`}>
                    
                    <div className="ingredientText">
                        <p className="ingredientQueryText">{excludedList[i]}</p>
                    </div>
                    
                    <div className="ingredientX">
                        <button onClick={() => this.deleteExcludedIngredients(i)} className="deleteIngredientButton">X</button>
                    </div>

                </div>
                
                
            )
        }

        return excludedHtml;
    }

    //  Removes the ingredient from the state which is used to make the api call for recipe searching
    deleteExcludedIngredients(excludedIngredientId) {
        let excludedList = this.state.excludedIngredients;
        
        excludedList.splice(excludedIngredientId,1);

        this.setState({excludedIngredients: excludedList});
    }

    //Api Search method parameters____________________________________________________________
    startSearching() {
        let dietIds = ['diet1','diet2','diet3'];
        let healthIds = ['health1','health2','health3','health4','health5'];

        let selectedDiets = [];
        let selectedHealth = [];


        for(let i = 0; i < dietIds.length; i++) {
            //saved the query selector as the current value in the for loop
            let currentSelectorId = `#${dietIds[i]}`;

            if (document.querySelector(currentSelectorId).checked === true){
                let currentApiValue = document.querySelector(currentSelectorId).value;
                selectedDiets.push(currentApiValue);
            }
            
        }

        for(let i = 0; i < healthIds.length; i++) {
            //saved the query selector as the current value in the for loop
            let currentSelectorId = `#${healthIds[i]}`;

            if (document.querySelector(currentSelectorId).checked === true){
                let currentApiValue = document.querySelector(currentSelectorId).value;
                selectedHealth.push(currentApiValue);
            }
            
        }
        
        
        let ingredientList = this.state.ingredients;
        //let mealType = document.getElementById('recipeFilterMealDropdown').value;

        if (ingredientList.length === 0) {
            alert('Please provide at least 1 ingredient.');
            return
        }

        let excludedIngredientList = this.state.excludedIngredients;

        this.props.recipeApiSearch(ingredientList,excludedIngredientList,selectedDiets,selectedHealth /*,mealType*/);
    }

    //  Hides the filter section and shows the display section for mobile
    displayMobileRecipeDisplay() {
        document.getElementById('recipeFilterContainer').style.display = 'none';
        document.getElementById('recipeDisplayContainer').style.display = 'block';

        //window.scrollTo(0,0);
    }



    render() {
        return (
            <div className='recipeFilterContainer' id="recipeFilterContainer">

                <div className='recipeFilterMobileTransitionContainer'>
                    <button className="recipeSectionTransitionButton" onClick={() => this.displayMobileRecipeDisplay()}>{'>'}</button>
                </div>

                <div className="recipeFilterContainerCenter">

                    <div className='recipeFilterFormContainer'>

                        <h2 className="recipeFilterHeader">Dietary Restrictions</h2>

                        <div className='recipeFilterForm' id="recipeFilterForm">

                            <div className="checkboxContainer">
                                <input type="checkbox" id="diet1" name="diet1" value="high-protein" />
                                <label htmlFor="diet1">High-Protein</label>
                            </div>
                            
                            <div className="checkboxContainer">
                                <input type="checkbox" id="diet2" name="diet2" value="low-carb" />
                                <label htmlFor="diet2">Low-Carb</label>
                            </div>
                            
                            <div className="checkboxContainer">
                                <input type="checkbox" id="diet3" name="diet3" value="low-fat" />
                                <label htmlFor="diet3">Low-Fat</label>
                            </div>
                            
                            <div className="checkboxContainer">
                                <input type="checkbox" id="health1" name="health1" value="vegan" />
                                <label htmlFor="health1">Vegan</label>
                            </div>
                            
                            <div className="checkboxContainer">
                                <input type="checkbox" id="health2" name="health2" value="vegetarian" />
                                <label htmlFor="health2">Vegetarian</label> 
                            </div>
                        
                            <div className="checkboxContainer">
                                <input type="checkbox" id="health3" name="health3" value="sugar-conscious" />
                                <label htmlFor="health3">Sugar conscious</label>
                            </div>
                            
                            <div className="checkboxContainer">
                                <input type="checkbox" id="health4" name="health4" value="peanut-free" />
                                <label htmlFor="health4">Peanut free</label>
                            </div>
                            
                            <div className="checkboxContainer">
                                <input type="checkbox" id="health5" name="health5" value="tree-nut-free" />
                                <label htmlFor="health5">Tree nut free</label>
                            </div>
                            
                        </div>

                        {/*The code below is for if and when I upgrade my plan with
                        the food api. */}
                        {/* 
                            <div className="recipeFilterMealType">
                            <h2 className="recipeFilterMealHeader">Meal Type</h2>
                            <form className="recipeFilterMealForm">
                                <select className="recipeFilterMealDropdown" id="recipeFilterMealDropdown">
                                    <option value=''>----</option>
                                    <option value="snack">Snack</option>
                                    <option value="breakfast">Breakfast</option>
                                    <option value="lunch">Lunch</option>
                                    <option value="dinner">Dinner</option>
                                </select>
                            </form>
                            </div>
                        */}
                        

                        <div className='recipeFilterFoodContainer'>

                            <h2 className="ingredientHeader">Ingredients</h2>
                            <div className='recipeFilterFoodForm' id="recipeFilterFoodForm"
                            data-tooltip="Type an ingredient and either click the add or exclude button."
                            >
                                <label htmlFor="ingredients" display="block" className="ingredientInputLabel">Ingredients</label>
                                <input 
                                    type="text" id="ingredients" className="ingredientFormBox" 
                                    placeholder="chicken, broccoli, pasta"
                                />

                            </div>
                            

                            <div className="ingredientInclusionContainer">
                                <button onClick={() => this.addIngredient()} className="ingredientInclusionButton">Add</button>
                                <p className="buttonDivider">or</p>
                                <button onClick={() => this.excludeIngredient()} className="ingredientInclusionButton">Exclude</button>
                            </div>

                            
                        
                        </div>
                    </div>

                    <div className="ingredientRequirements">
                        <div className="addedIngredients">
                            <h3 className="includedIngredientHeader">Included</h3>
                            {this.renderAllIngredients()}
                        </div>

                        <div className="excludedIngredients">
                            <h3 className="includedIngredientHeader">Excluded</h3>
                            {this.renderExcludedIngredients()}
                        </div>
                    </div>
                
                

                    <div className="recipeSearchButtonContainer">
                        <button className="recipeSearchButton" onClick={() => this.startSearching()}>Start Searching</button>
                    </div>

                </div>
            </div>
            
        )
    }
}

export default recipeFilter;