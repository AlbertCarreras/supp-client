import React from 'react';
import { Icon } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

// ADAPTERS
import Adapters from './../../Adapters/Adapters';

// ACTIONS
import { selectCommonInterests } from './../../Actions/userInterestsActions';
import { thunkSaveFilteredClosestUsers } from './../../Actions/userFriendsActions';

const mapDispatchToProps = dispatch => {
    return {
        selectCommonInterests: (selectedCommonInterest) => dispatch(selectCommonInterests(selectedCommonInterest)),
        thunkSaveFilteredClosestUsers: (interestId) => dispatch(thunkSaveFilteredClosestUsers(interestId)),
    }
  }

const FriendInterestList = (props) => {

    function buildInterestList() {
        return props.friendInterestArray.map( (interest) => {
            
            //Map over the array of interests. Add icons with functionality: select interest from which to look for matching people with same interests.
            return  <div key={interest.id}>
                        {Adapters.capitalize(interest.name)}
                        <Icon 
                            onClick={() => {
                                props.selectCommonInterests(interest)
                                props.thunkSaveFilteredClosestUsers(interest.id)
                                props.onClickClose();
                            }}
                            color='teal' 
                            name='users' 
                        />
                    </div>
        })
    }

    return (
        <div className="interest-list">
            {buildInterestList()}
        </div>
    )
};

export default connect(null, mapDispatchToProps)(withRouter(FriendInterestList));