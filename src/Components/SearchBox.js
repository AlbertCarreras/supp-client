import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import _ from 'lodash'

// ADAPTERS
import Adapters from './../Adapters/Adapters';

//COMPONENTS
import SearchList from './SearchList'

class SearchBox extends Component {
    // keeping local state
    state = {
        searchTerm: "",
        searchTermArray: [],
    };

     //PROPS FUNCTIONALITY: Button handlers
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        }, () => this.searchTerm(this.state.searchTerm))
    }

    searchTerm = (searchTerm) =>
    
        searchTerm === "" || searchTerm.length < 2
            ? this.setState({
                searchTermArray: [],
                })
            : _.debounce( 
                () => Adapters.getSearchMatches(searchTerm)
                .then( resp => {
                    searchTerm === ""
                    this.setState({
                        searchTermArray: resp,
                    })
                })
                .catch(err => {})
            , 500).call(this)

    displayInterestList = () => {
        if (this.state.searchTermArray.length > 0) {
            return <SearchList searchTermArray={this.state.searchTermArray}/>
        }
    }

    render () {
        return (
                <div className="ui search">
                    <div className="ui icon input">
                        <input 
                            className="prompt" 
                            type="text"
                            placeholder="Search interests..."
                            name="searchTerm"
                            onChange={this.handleChange}
                            value={this.state.searchTerm}
                        />
                        <i className="search icon"></i>
                    </div>
                    { this.displayInterestList()}
                </div>
        )
    }
};

export default withRouter(SearchBox);