import React, { Component } from 'react';

import RecipeFilter from '../RecipeFilter/recipeFilter';
import RecipeDisplay from '../RecipeDisplay/recipeDisplay';

import './recipeSection.css';

class recipeSection extends Component {
    render() {
        return (

            <div className="recipeSectionComponent" id="recipeSectionComponent">

                <h1>recipeSection</h1>
                <RecipeFilter recipeApiSearch={this.props.recipeApiSearch}/>
                <RecipeDisplay 
                    currentRecipeProp={this.props.currentRecipeProp}
                    nextRecipeFunction={this.props.nextRecipeFunction}
                />
                
            </div>
            

        )
    }
}

export default recipeSection;