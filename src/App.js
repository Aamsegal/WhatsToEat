
import React, { Component } from 'react';

//Placeholder stuff

import AppNavbar from './Appnavbar/Appnavbar';
import RecipeSection from './RecipeSection/recipeSection';
import SavedRecipes from './SavedRecipes/savedRecipes';
import UserProfile from './UserProfile/userProfile';

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

  render() {
    return (
      <div className="application">

        <AppNavbar />

        <RecipeSection 
          recipeApiSearch={this.recipeApiSearch} 
          currentRecipeProp={this.state.recipes[0]}
          nextRecipeFunction={this.nextRecipe}
        />

        <SavedRecipes />

        <UserProfile />

      </div>
      
    )
  }
}

export default App;
