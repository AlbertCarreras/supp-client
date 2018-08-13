import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

// ADAPTERS
import Adapters from './../Adapters/Adapters';

// ACTIONS
import { unselectCommonInterests } from '../actions'

//COMPONENTS
import UserInterestList from './UserInterestList'

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        selectedCommonInterest: state.selectedCommonInterest,
        userInterests: state.userInterests
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unselectCommonInterests: () => dispatch(unselectCommonInterests())
    }
}

class InterestsList extends Component {
    render() {
        return (
            <div className="filter-container">
                <div>Meet people who <Icon color='red' name='heart'/></div>
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
                <div>What you <Icon color='red' name='heart'/></div>
                <UserInterestList />
            </div>
       
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InterestsList);