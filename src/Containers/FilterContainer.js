import React, { Component } from 'react';

//COMPONENTS
import SearchBox from '../Components/SearchBox';

class FilterContainer extends Component {
    render() {
        return (
            <div className="aside filter-container">
                <p>INTEREST SEARCH</p>
                <SearchBox />
                <br/>
                <p>YOUR INTERESTS</p>

            </div>

        );
    }
}

export default FilterContainer;