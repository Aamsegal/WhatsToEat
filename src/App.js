import React, { Component } from 'react';


import AppNavbar from './Appnavbar/Appnavbar';
import RecipySection from './RecipySection/recipySection';
import SavedRecipes from './SavedRecipes/savedRecipes';
import UserProfile from './UserProfile/userProfile';

class App extends Component {
  render() {
    return (
      <div className="application">

        <AppNavbar />

        <RecipySection />

        <SavedRecipes />

        <UserProfile />

      </div>
      
    )
  }
}

export default App;
