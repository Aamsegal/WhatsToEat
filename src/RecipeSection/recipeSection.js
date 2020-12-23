import React, { Component } from 'react';

import RecipeFilter from '../RecipeFilter/recipeFilter';
import RecipeDisplay from '../RecipeDisplay/recipeDisplay';

import './recipeSection.css';

class recipeSection extends Component {

    //Nothing really crazy here. Just a parent for two more complex components
    render() {
        return (

            <div className="recipeSectionComponent" id="recipeSectionComponent">
                
                <div className="recipeSectionTitleContainer">
                    <h1 className="recipeSectionTitle">Start Searching</h1>
                    <h2 className="savedSuccessful" id="savedSuccessful">Recipe Saved!</h2>
                </div>

                <div className="recipeComponentsContainer">
                    <RecipeFilter recipeApiSearch={this.props.recipeApiSearch}/>
                    <RecipeDisplay 
                        currentRecipeProp={this.props.currentRecipeProp}
                        nextRecipeFunction={this.props.nextRecipeFunction}
                        saveRecipeFunction={this.props.saveRecipeFunction}
                    />
                </div>
                
                
                
            </div>
            

        )
    }
}

export default recipeSection;