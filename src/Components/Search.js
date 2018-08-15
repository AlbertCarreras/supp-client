import React, {Component} from 'react';
import { Icon } from 'semantic-ui-react'
import _ from 'lodash'

// ADAPTERS
import Adapters from './../Adapters/Adapters';

//COMPONENTS
import SearchList from './SearchList'

class Search extends Component {
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
                .then( resp => this.setState({searchTermArray: resp}))
                .catch(err => {})
            , 100).call(this)

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
                            placeholder="Search activities you ♥"
                            name="searchTerm"
                            onChange={this.handleChange}
                            value={this.state.searchTerm}
                        />
                        <i className="search icon"></i>
                    </div>
                    {   this.state.searchTerm !== ""
                        ? this.displayInterestList()
                        :   <p className="animated bounceIn delay-5s">Start here 
                                <Icon 
                                    color='teal' 
                                    name='arrow up' 
                                />
                            </p>
                    }

                </div>
        )
    }
};

export default Search;