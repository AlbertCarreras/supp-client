import React, {Component} from 'react';
import { Icon } from 'semantic-ui-react'
import _ from 'lodash'

// ADAPTERS
import Adapters from './../../Adapters/Adapters';

//COMPONENTS
import SearchList from './SearchList'
import NewSearchWordForm from './NewSearchWordForm'

class Search extends Component {
    // keeping local state
    state = {
        searchTerm: "",
        searchTermArray: [],
    };

    //PROPS FUNCTIONALITY: Button handlers
    handleChange = (event) => {
        //Bad-words functionality 
        var Filter = require('bad-words'),
        filter = new Filter();
        filter.addWords("suck")
        filter.removeWords("hell")
        this.setState({
            [event.target.name]: filter.isProfane(event.target.value) ? "" : event.target.value,
        }, () => this.searchTerm(this.state.searchTerm))
    }

    //SEARCH FUNCTIONALITY
    searchTerm = (searchTerm) =>
        // Check if searched term is valid and shorter than 2 letters. If so, input in state should be an empty array.
        //If not, use debouce from Lodash to fetch and requests interests based on the input value. 
        searchTerm === "" || searchTerm.length < 2
            ? this.setState({
                searchTermArray: [],
                })
            : _.debounce( 
                () => Adapters.getSearchMatches(searchTerm)
                .then( resp => this.setState({searchTermArray: resp}))
                .catch(err => {})
            , 100).call(this)

    cleanSearchTerm = () => {
        // Delete any input value when new word is persisted.
        this.setState({
            searchTerm: "",
        })
    }

    displayInterestList = () => {
        // Check if the returned array has any value. If so, display the results.
        // If not, check if the search term is long enough. If so, show button for creating new interest. Passing helper function and state to component.
        if (this.state.searchTermArray.length > 0) {
            return <SearchList 
                        searchTermArray={this.state.searchTermArray}
                    />
        } 
        else if (this.state.searchTerm.length > 2 ) {
            return <NewSearchWordForm 
                        searchTerm={this.state.searchTerm}
                        cleanSearchTerm={this.cleanSearchTerm}
                    />
        }
    }

    checkValues = () => {
        // Check if there is any searched term input. If so, display search results. If not, display "start here" sign.
        if (this.state.searchTerm !== "") {
            return this.displayInterestList()
        } 
        else {
            return <p className="animated bounceIn delay-5s">
                        Start here 
                        <Icon 
                            color='teal' 
                            name='arrow up' 
                        />
                    </p>
        }
    }

    render () {
        return (
                <div className="ui search">
                    <div className="ui icon input">
                        <input 
                            className="prompt" 
                            type="text"
                            placeholder="Search activities you ♥"
                            name="searchTerm"
                            onChange={this.handleChange}
                            value={this.state.searchTerm}
                        />
                        <i className="search icon"></i>
                    </div>
                    { this.checkValues() }
                </div>
        )
    }
};

export default Search;