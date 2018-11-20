import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

// ADAPTERS
import Adapters from './../../Adapters/Adapters';

// ACTIONS
import { unselectCommonInterests, thunkSaveUserInterests } from './../../Actions/userInterestsActions';
import { thunkSaveClosestUsers } from './../../Actions/userFriendsActions';

//COMPONENTS
import UserInterestList from './../CentralUsersSection/UserInterestList'

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        selectedCommonInterest: state.userInterests.selectedCommonInterest,
        userInterests: state.userInterests.userInterests
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unselectCommonInterests: () => dispatch(unselectCommonInterests()),
        thunkSaveUserInterests: (userId, userInterestArray) => dispatch(thunkSaveUserInterests(userId, userInterestArray)),
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
                                                    this.props.thunkSaveUserInterests(this.props.userId, this.props.selectedCommonInterest)
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