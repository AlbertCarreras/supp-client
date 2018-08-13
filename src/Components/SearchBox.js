import React, {Component, Fragment} from 'react';
import { withRouter } from "react-router-dom";
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import _ from 'lodash'

// ACTIONS
import { unselectCommonInterests } from '../actions'

// ADAPTERS
import Adapters from './../Adapters/Adapters';

//COMPONENTS
import SearchList from './SearchList'

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        selectedCommonInterest: state.selectedCommonInterest,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unselectCommonInterests: () => dispatch(unselectCommonInterests())
    }
  }

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
                .then( resp => this.setState({searchTermArray: resp}))
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
                            placeholder="Search activities you ♥"
                            name="searchTerm"
                            onChange={this.handleChange}
                            value={this.state.searchTerm}
                        />
                        <i className="search icon"></i>
                    </div>
                    { this.displayInterestList()}
                    <div className="filter-container">
                        Meet people who <Icon color='red' name='heart'/>
                    </div>
                    {
                        this.props.selectedCommonInterest !== undefined
                            ?   <div className="line-container">
                                        {Adapters.capitalize(this.props.selectedCommonInterest.name)}
                                    <Icon onClick={
                                        () => this.props.unselectCommonInterests()                      
                                    } color='teal' name='remove' />
                                    <Icon onClick={
                                        () => {}                       
                                    } color='teal' name='user plus' />
                                </div>
                            : null
                    }
                </div>
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBox));