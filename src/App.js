
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import config from './config';

//Placeholder stuff

import AppNavbar from './Appnavbar/Appnavbar';
import RecipeSection from './RecipeSection/recipeSection';
import SavedRecipes from './SavedRecipes/savedRecipes';
import UserProfile from './UserProfile/userProfile';

const cookies = new Cookies();

const app_id = process.env.REACT_APP_APP_ID;
const app_key = process.env.REACT_APP_APP_KEY;
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

class App extends Component {

  state = {
    recipes: [],
    pastRecipes: []
  }

  recipeApiSearch = (foodParam,excludeParam,dietParam,healthParams) => {

    let apiURL = `${api_endpoint}app_id=${app_id}&app_key=${app_key}`;
    let foodQuery = `&q=`;

    for(let i=0; i < foodParam.length; i++) {
      
      if(i === 0) {
        foodQuery += foodParam[i];
      }else {
        foodQuery += `+${foodParam[i]}`;
      }

    }

    apiURL += foodQuery;

    if(excludeParam.length !== 0) {
      
      for(let i=0; i < excludeParam.length; i++) {
        let lowercaseExclude = excludeParam[i].toLowerCase();

        apiURL += `&excluded=${lowercaseExclude}`;
      }

    }

    //for each value in diet params, add the health param to the url
    for(let i=0; i < dietParam.length; i++) {
      apiURL += `&diet=${dietParam[i]}`
    }

    for(let i=0; i < healthParams.length; i++) {
      apiURL += `&health=${healthParams[i]}`
    }

    apiURL += '&from=0&to=75'

    fetch(apiURL, {
      method: 'GET',
      header: {
        'content-type': 'application/json'
      }
    })
    
    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }

      return res.json()
    })

    .then(recipes => {
      this.setState({recipes: recipes.hits})
    })
    
  }

  nextRecipe = () => {

    if(this.state.recipes.length === 1) {
      console.log('There are no more recipies')
    }else {
      //saved the current recipe to save to past recipes later
      let currentrecipe = this.state.recipes[0];
      
      //Grabs all the recipes to then splice later
      let remainingRecipes = this.state.recipes;

      //Grabs past recipes to add the current recipe to
      let pastRecipes = this.state.pastRecipes;

      //removes the front most recipe from the recipe state
      remainingRecipes.splice(0,1);
      this.setState({recipes: remainingRecipes})

      //adds the current recipe to the past recipe list and saved the past state with the new array
      pastRecipes.push(currentrecipe);
      this.setState({pastRecipes: pastRecipes})
    }
  }

  saveRecipe = () => {
    //  Check for login token to identify if the user is logged in
    let loginToken = cookies.get('loginToken');

    if(loginToken === undefined || loginToken === '') {
      alert("You must be logged in to save recipe's")
    }
    let recipe_id = '';
    let recipe_name = this.state.recipes[0].recipe.label;
    let recipe_image_link = this.state.recipes[0].recipe.image;
    let serving_size = this.state.recipes[0].recipe.yield;
    let total_calories = Math.round(this.state.recipes[0].recipe.calories);
    let cook_time = this.state.recipes[0].recipe.totalTime;
    let cooking_instruction_link = this.state.recipes[0].recipe.url;
    let ingredientList = this.state.recipes[0].recipe.ingredientLines;
    let allergyList = this.state.recipes[0].recipe.healthLabels;

    //  Saves recipe info for api call
    const recipeInfo = { 
      recipe_name, 
      recipe_image_link, 
      serving_size, 
      total_calories, 
      cook_time, 
      cooking_instruction_link, 
      loginToken
    }

    //  Api call to save recipe
    fetch(`${config.DATABASE_API_ENDPOINT}/api/recipeEndpoint`, {
      method: 'POST',
      body: JSON.stringify(recipeInfo),
      headers: {
        'content-type': 'application/json'
      }
    })

    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
      return res.json()
    })

    .then(data => {
      recipe_id = data.id;
      
      this.addIngredients(recipe_id,ingredientList);

      this.addAllergies(recipe_id, allergyList);
    })

    


  }

  addIngredients(recipe_id, ingredientList) {

    for(let i = 0; i < ingredientList.length; i++) {
      let ingredient = ingredientList[i];
      let ingredientInfo = {recipe_id, ingredient};

      fetch(`${config.DATABASE_API_ENDPOINT}/api/ingredientEndpoint`, {
        method: 'POST',
        body: JSON.stringify(ingredientInfo),
        headers: {
          'content-type': 'application/json'
        }
      })

      .then(res => {
        if(!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }

        return res.json()
      })

    }
  }

  addAllergies(recipe_id, allergyList) {
    
    for(let i = 0; i < allergyList.length; i ++) {
      let allergy_info = allergyList[i];
      let allergyInfo = {recipe_id, allergy_info};

      fetch(`${config.DATABASE_API_ENDPOINT}/api/allergyEndpoint`, {
        method: 'POST',
        body: JSON.stringify(allergyInfo),
        headers: {
          'content-type': 'application/json'
        }
      })

      .then(res => {
        if(!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }

        return res.json()
      })
    }
  }

  render() {
    return (
      <div className="application">

        <AppNavbar />

        <RecipeSection 
          recipeApiSearch={this.recipeApiSearch} 
          currentRecipeProp={this.state.recipes[0]}
          nextRecipeFunction={this.nextRecipe}
          saveRecipeFunction={this.saveRecipe}
        />

        <SavedRecipes />

        <UserProfile />

      </div>
      
    )
  }
}

export default App;
