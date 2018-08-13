import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'

//COMPONENTS
import SearchBox from '../Components/SearchBox';

class FilterContainer extends Component {
    render() {
        return (
            <div className="filter-container">
                <SearchBox />
                <br/>
                <div>What you <Icon color='red' name='heart'/></div>

            </div>

        );
    }
}

export default FilterContainer;