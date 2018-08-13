import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

// ADAPTERS
import Adapters from './../Adapters/Adapters';

// ACTIONS
import { unselectCommonInterests } from '../actions'

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

class InterestsList extends Component {
    render() {
        return (
            <div className="filter-container">
                Meet people who <Icon color='red' name='heart'/>
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
       
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InterestsList);