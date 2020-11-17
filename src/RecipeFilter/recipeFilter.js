import React, { Component } from 'react';

import './recipeFilter.css';

//  Notes for api call
//---Can add extra health filters, just need to add another 
//(health={filter1}&health={filter2})

//---Can add extra food filters. q={food1}+{food2}

//

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
            alert('No ingredient added.')
        }else {
            let currentIngredients = this.state.ingredients;
            currentIngredients.push(ingredient)

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
                <div className="addedIngredient" id={`${ingredientList[i]}+${i}`}>
                    <p>{ingredientList[i]}</p>
                    <button onClick={() => this.deleteIngredient(i)}>Delete Ingredient</button>
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
            alert('No ingredient to exclude.')
        }else {
            let currentIngredients = this.state.excludedIngredients;
            currentIngredients.push(excludedIngredient);

            this.setState({excludedIngredients: currentIngredients})
            document.getElementById('ingredients').value = '';
        }
    }

    renderExcludedIngredients() {
        let excludedHtml = [];
        let excludedList = this.state.excludedIngredients;

        for(let i = 0; i < excludedList.length; i++) {
            excludedHtml.push(
                <div className="excludedIngredient" id={`${excludedList[i]}+${i}`}>
                    <p>{excludedList[i]}</p>
                    <button onClick={() => this.deleteExcludedIngredients(i)}>Delete Ingredient</button>
                </div>
                
                
            )
        }

        return excludedHtml;
    }

    deleteExcludedIngredients(excludedIngredientId) {
        let excludedList = this.state.excludedIngredients;
        
        excludedList.splice(excludedIngredientId,1);

        this.setState({excludedIngredients: excludedList})
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

        if (ingredientList.length === 0) {
            alert('Please provide atleast 1 ingredient.');
            return
        }

        let excludedIngredientList = this.state.excludedIngredients;

        this.props.recipeApiSearch(ingredientList,excludedIngredientList,selectedDiets,selectedHealth);
    }

    render() {
        return (
            <div className='recipeFilterContainer'>

                <div className='recipeFilterFormContainer'>

                    <h3>Dietary Restrictions</h3>

                    <form className='recipeFilterForm'>

                        <div className="checkboxContainer">
                            <input type="checkbox" id="diet1" name="diet1" value="high-protein" />
                            <label htmlFor="diet1">High-Protien</label>
                        </div>
                        
                        <div className="checkboxContainer">
                            <input type="checkbox" id="diet2" name="diet2" value="low-carb" />
                            <label htmlFor="diet2">Low-Carb</label>
                        </div>
                        
                        <div className="checkboxContainer">
                            <input type="checkbox" id="diet3" name="diet3" value="low-fat" />
                            <label htmlFor="diet1">Low-Fat</label>
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
                        
                    </form>

                    <div className='recipeFilterFoodContainter'>

                        <h3>Ingredients</h3>

                        <form className='recipeFilterFoodForm'>

                            <input type="text" id="ingredients" name="ingredients" placeholder="chicken, brocolli, pasta"/>
                            
                        </form>
                        
                        <button onClick={() => this.addIngredient()}>Add Ingredient</button>
                        <button onClick={() => this.excludeIngredient()}>Exclude Ingredient</button>
                    
                    </div>
                </div>

                <div className="addedIngredients">
                    <h3>Included</h3>
                    {this.renderAllIngredients()}
                </div>

                <div className="excludedIngredients">
                    <h3>Excluded</h3>
                    {this.renderExcludedIngredients()}
                </div>

                <div className="recipeSearchButtonContainer">
                    <button className="recipeSearchButton" onClick={() => this.startSearching()}>Start Searching</button>
                </div>
            </div>
            
        )
    }
}

export default recipeFilter;