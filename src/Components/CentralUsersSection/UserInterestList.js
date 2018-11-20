import React from 'react';
import { Icon } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

// ADAPTERS
import Adapters from './../../Adapters/Adapters';

// ACTIONS
import { selectCommonInterests, thunkRemoveUserInterests } from './../../Actions/userInterestsActions';
import { thunkSaveFilteredClosestUsers } from './../../Actions/userFriendsActions';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        userInterests: state.userInterests.userInterests,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectCommonInterests: (selectedCommonInterest) => dispatch(selectCommonInterests(selectedCommonInterest)),
        thunkRemoveUserInterests: (userInterest) => dispatch(thunkRemoveUserInterests(userInterest)),
        thunkSaveFilteredClosestUsers: (interestId) => dispatch(thunkSaveFilteredClosestUsers(interestId)),
    }
  }

const UserInterestList = (props) => {

    function buildInterestList() {

        //Map over the returned array of interests. Add icons with functionality: remove interests to user list or select interest from which to look for matching people with same interests.
        return props.userInterests.map( (interest) => {
            return  <div key={interest.id}>
                        {Adapters.capitalize(interest.name)}
                            <Icon 
                                onClick={() => {
                                    props.selectCommonInterests(interest)
                                    props.thunkSaveFilteredClosestUsers(interest.id)
                                    if (props.onClickClose) {
                                        props.onClickClose()
                                    }
                                }}
                                color='teal' 
                                name='users' 
                            />
                            <Icon 
                                onClick={() => {
                                    props.thunkRemoveUserInterests(interest)
                                }}
                                color='teal'
                                name='user close'
                            />
                    </div>
        })
    }

    return (
        <div className="interest-list">
            { 
                // Check if user has any interest. If so, display them. Otherwise, display instructions.
                props.userInterests.length > 0
                ?   buildInterestList()
                :   <div className="empty-message">
                        <p>Choose your activities clicking on 
                            <Icon 
                                color='teal'
                                name='user plus'
                            />
                        </p>
                        <p>Unselect your activities clicking on 
                            <Icon 
                                color='teal'
                                name='user remove'
                            />
                        </p>
                    </div>
            }
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserInterestList));