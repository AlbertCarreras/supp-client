import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

// ADAPTERS
import Adapters from './../Adapters/Adapters';
import AdapterUser from './../Adapters/AdapterUser';

// ACTIONS
import { unselectCommonInterests, saveUserInterests, thunkSaveClosestUsers } from '../actions'

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
        unselectCommonInterests: () => dispatch(unselectCommonInterests()),
        saveUserInterests: (userInterests) => dispatch(saveUserInterests(userInterests)),
        thunkSaveClosestUsers: () => dispatch(thunkSaveClosestUsers()),
    }
}

class InterestsList extends Component {
    render() {
        return (
            <div>
                <div 
                    className="heart-message"
                    >Meet people who 
                    <Icon 
                        color='red' 
                        name='heart'
                    />
                </div>
                    {
                        this.props.selectedCommonInterest !== undefined
                            ?   <div className="line-container">
                                    {Adapters.capitalize(this.props.selectedCommonInterest.name)}
                                    <Icon 
                                        onClick={ () => {
                                            this.props.unselectCommonInterests()
                                            this.props.thunkSaveClosestUsers()
                                        }} 
                                        color='teal'
                                        name='remove'
                                    />
                                    { !this.props.userInterests.find((i)=> i.id === this.props.selectedCommonInterest.id)
                                        ?   <Icon 
                                                onClick={() => {
                                                    AdapterUser.persistAddInterests(this.props.userId, this.props.selectedCommonInterest)
                                                    .then(resp => this.props.saveUserInterests(resp.interests))
                                                }}
                                                color='teal'
                                                name='user plus'
                                            />
                                        : null
                                        
                                    }
                                </div>
                                :   <div className="empty-message">
                                        <p>Select an activity by clicking on 
                                            <Icon 
                                                color='teal'
                                                name='users'
                                            />
                                        </p>
                                        <p>Unselect your activities clicking on 
                                            <Icon 
                                                color='teal'
                                                name='remove'
                                            />
                                        </p>
                                    </div>

                    } 
                <div 
                    className="heart-message"
                    >What you 
                        <Icon 
                            color='red' 
                            name='heart'
                        />
                </div>
                <UserInterestList />
            </div>
       
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InterestsList);