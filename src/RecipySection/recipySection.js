import React, { Component } from 'react';

import RecipyFilter from '../RecipyFilter/recipyFilter';
import RecipyDisplay from '../RecipyDisplay/recipyDisplay'

class RecipySection extends Component {
    render() {
        return (

            <div className="recipySectionComponent" id="recipySectionComponent">

                <h1>RecipySection</h1>
                <RecipyFilter />
                <RecipyDisplay />
                
            </div>
            

        )
    }
}

export default RecipySection;