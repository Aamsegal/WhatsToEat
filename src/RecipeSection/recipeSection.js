import React, { Component } from 'react';

import RecipeFilter from '../RecipeFilter/recipeFilter';
import RecipeDisplay from '../RecipeDisplay/recipeDisplay';

import './recipeSection.css';

class recipeSection extends Component {
    render() {
        return (

            <div className="recipeSectionComponent" id="recipeSectionComponent">
                
                <div className="recipeSectionTitleContainer">
                    <h1 className="recipeSectionTitle">Start Searching</h1>
                </div>
                
                <RecipeFilter recipeApiSearch={this.props.recipeApiSearch}/>
                <RecipeDisplay 
                    currentRecipeProp={this.props.currentRecipeProp}
                    nextRecipeFunction={this.props.nextRecipeFunction}
                    saveRecipeFunction={this.props.saveRecipeFunction}
                />
                
            </div>
            

        )
    }
}

export default recipeSection;