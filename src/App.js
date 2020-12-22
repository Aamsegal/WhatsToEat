
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import './app.css'

//Placeholder stuff

import AppNavbar from './Appnavbar/Appnavbar';
import RecipeSection from './RecipeSection/recipeSection';
import SavedRecipes from './SavedRecipes/savedRecipes';
import UserProfile from './UserProfile/userProfile';


const app_id = process.env.REACT_APP_APP_ID;
const app_key = process.env.REACT_APP_APP_KEY;
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const whats_to_eat_endpoint = process.env.REACT_APP_DATABASE_API_ENDPOINT;

class App extends Component {

  state = {
    recipes: [],
    pastRecipes: [],
    savedRecipes: []
  }

  //  Checks login token on mount
  componentDidMount() {

    let loginToken = Cookies.get('loginToken');

    if(loginToken !== undefined) {
      this.getSavedRecipes(loginToken)
    }
    
  };

  //  Uses login token param to grab recipes from database
  getSavedRecipes (loginToken) {

    fetch(`${whats_to_eat_endpoint}/api/recipeEndpoint/getRecipe/${loginToken}`, {
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

    .then(userRecipes => {
      let recipeAndExtra = userRecipes;
      //this.setState({savedRecipes: userRecipes})

      //let recipeList = [...this.state.savedRecipes];
      //let deepCopy = cloneDeep(recipeList);

      //recipeList.forEach(item => deepCopy.push(item));

      /*
      for(let x = 0; x < deepCopy.length; x++) {
        let currentIngredient = deepCopy[x];

        deepCopy.push(currentIngredient);
      }
      */      
      
      for(let i=0; i < recipeAndExtra.length; i++){
        
        let currentIngredients = this.getSavedIngredients(recipeAndExtra[i], i);
        let currentAllergies = this.getSavedAllergies(recipeAndExtra[i], i);
        
        recipeAndExtra[i].ingredients = currentIngredients;
        recipeAndExtra[i].allergies = currentAllergies;
      }

      return recipeAndExtra;

    })

    .then(savedRecipesResponse => {

      console.log(savedRecipesResponse)
      this.setState({savedRecipes: savedRecipesResponse});

    })

  }

  //  Goes through each recipe and makes an api call for ingredients and allergy info
  getSavedIngredients(recipe, savedRecipeIndex) {

    let recipeId = recipe.id;      
    let ingredientArray = [];

    fetch(`${whats_to_eat_endpoint}/api/ingredientEndpoint/recipe/${recipeId}`, {
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

    //  Adding the recipe array to teh 
    .then(ingredients => {

      // Change the array of objects into just an array of ingredients
      for(let x=0; x < ingredients.length; x++) {
        ingredientArray.push(ingredients[x].ingredient)
      }
      return ingredientArray;      
    })

    return ingredientArray;


  }

  //  Adds the allergy info the the recipes
  getSavedAllergies = (recipe, savedRecipeIndex) => {

    let recipeId = recipe.id;
    let allergyArray = [];

    fetch(`${whats_to_eat_endpoint}/api/allergyEndpoint/recipe/${recipeId}`, {
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

    .then(allergies => {

      // Change the array of objects into just an array of ingredients
      for(let x=0; x < allergies.length; x++) {
        allergyArray.push(allergies[x].allergy_info)
      }
    })
    return allergyArray;
  }

  //  Makes api call to recipe database
  recipeApiSearch = (foodParam,excludeParam,dietParam,healthParams,mealType) => {

    let apiURL = `${api_endpoint}app_id=${app_id}&app_key=${app_key}`;
    let foodQuery = `&q=`;
    let excludeQuery = '';

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

    /*
    if(mealType !== '') {
      apiURL += `&mealType=${mealType}`
    }

    //This function can be implemented if I purchase the better version of edamam api
    */

    apiURL += '&from=0&to=100'

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
      let windowWidth = window.innerWidth;
      
      if(windowWidth < 1080) {
        document.getElementById('recipeFilterContainer').style.display = 'none';
        document.getElementById('recipeDisplayContainer').style.display = 'block';

        window.scrollTo(0,0);
      }
    })
    
  }

  //  Cycles through the returned recipes
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

      window.scrollTo(0,0);
    }
  }

  //  Saves recipe to the users account
  saveRecipe = () => {
    //  Check for login token to identify if the user is logged in
    let loginToken = Cookies.get('loginToken');

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
    fetch(`${whats_to_eat_endpoint}/api/recipeEndpoint`, {
      method: 'POST',
      body: JSON.stringify(recipeInfo),
      headers: {
        'content-type': 'application/json'
      }
    })

    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }else {
        document.getElementById('savedSuccessful').style.display = "block";

        setTimeout(() => 
          {document.getElementById('savedSuccessful').style.display = "none";}, 3000
        )
      }
      return res.json()
    })

    .then(data => {
      recipe_id = data.id;
      
      this.addIngredients(recipe_id, ingredientList);

      this.addAllergies(recipe_id, allergyList);

      let loginToken = Cookies.get('loginToken');

      return loginToken
    })

    .then(loginToken => {
      this.getSavedRecipes(loginToken)
    })
  }

  //  Adds ingredients for the current recipe to the database
  addIngredients(recipe_id, ingredientList) {

    for(let i = 0; i < ingredientList.length; i++) {
      let ingredient = ingredientList[i];
      let ingredientInfo = {recipe_id, ingredient};

      fetch(`${whats_to_eat_endpoint}/api/ingredientEndpoint`, {
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

  //  Adds allergies for the current recipe to the database
  addAllergies(recipe_id, allergyList) {
    
    for(let i = 0; i < allergyList.length; i ++) {
      let allergy_info = allergyList[i];
      let allergyInfo = {recipe_id, allergy_info};

      fetch(`${whats_to_eat_endpoint}/api/allergyEndpoint`, {
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

  //  Deletes the recipes and makes a call to get the remaining recipes
  deleteRecipe = (recipe_Id, recipe_name) => {

    let confirmDeleteRecipe = window.confirm(`Are you sure you want to delete ${recipe_name}?`);

    if(confirmDeleteRecipe == true) {

      fetch(`${whats_to_eat_endpoint}/api/recipeEndpoint/deleteRecipe/${recipe_Id}`, {
        method: 'DELETE',
        header: {
          'content-type': 'application/json'
        }
      })

      .then(res => {

        if(!res.ok) {
          return res.json().then(e => Promise.reject(e)) 
        }

        return Cookies.get('loginToken')
      })

      .then(loginToken => {

        this.getSavedRecipes(loginToken);
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

    
        <SavedRecipes 
          savedRecipes={this.state.savedRecipes}
          deleteRecipeFunction={this.deleteRecipe}/>

        <UserProfile />

        <footer className="footerSection">
          <div className="edamamIcon" id="edamam-badge" data-color="white"></div>
        </footer>
      </div>
      
    )
  }
}

export default App;
