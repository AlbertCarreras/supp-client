import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

// ADAPTERS
import Adapters from './../Adapters/Adapters';
import AdapterUser from './../Adapters/AdapterUser';

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
                                    <Icon 
                                        onClick={
                                            () => this.props.unselectCommonInterests()
                                        } 
                                        color='teal'
                                        name='remove'
                                    />
                                    { !this.props.userInterests.find((i)=> i.id === this.props.selectedCommonInterest.id)
                                        ?   <Icon 
                                                onClick={() => {
                                                    AdapterUser.persistAddInterests(this.props.userId, this.props.selectedCommonInterest.name)
                                                    .then(resp => this.props.saveUserInterests(resp.interests))
                                                }}
                                                color='teal'
                                                name='user plus'
                                            />
                                        : null
                                        
                                    }
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