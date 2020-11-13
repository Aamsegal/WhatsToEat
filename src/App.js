
import React, { Component } from 'react';

import AppNavbar from './Appnavbar/Appnavbar';
import RecipySection from './RecipySection/recipySection';
import SavedRecipes from './SavedRecipes/savedRecipes';
import UserProfile from './UserProfile/userProfile';

const app_id = process.env.REACT_APP_APP_ID;
const app_key = process.env.REACT_APP_APP_KEY;
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

class App extends Component {

  state = {

  }

  recipyApiSearch = (foodParam,dietParam,healthParams) => {

    let apiURL = `${api_endpoint}app_id=${app_id}&app_key=${app_key}`;
    console.log(apiURL)
    let foodQuery = `&q=`;

    for(let i=0; i < foodParam.length; i++) {
      
      if(i === 0) {
        foodQuery += foodParam[i];
      }else {
        foodQuery += `+${foodParam[i]}`;
      }

    }

    apiURL += foodQuery;

    //for each value in diet params, add the health param to the url
    for(let i=0; i < dietParam.length; i++) {
      apiURL += `&diet=${dietParam[i]}`
    }

    for(let i=0; i < healthParams.length; i++) {
      apiURL += `&health=${healthParams[i]}`
    }

    apiURL += '&from=0&to=5'

    console.log(apiURL);
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
      this.setState({recipes})
    })
    
  }

  render() {
    return (
      <div className="application">

        <AppNavbar />

        <RecipySection recipyApiSearch={this.recipyApiSearch}/>

        <SavedRecipes />

        <UserProfile />

      </div>
      
    )
  }
}

export default App;
