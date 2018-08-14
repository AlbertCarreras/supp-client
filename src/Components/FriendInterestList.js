import React from 'react';
import { Icon } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

// ADAPTERS
import Adapters from './../Adapters/Adapters';

// ACTIONS
import { selectCommonInterests, saveFilteredClosestUsers } from '../actions';

const mapDispatchToProps = dispatch => {
    return {
        selectCommonInterests: (selectedCommonInterest) => dispatch(selectCommonInterests(selectedCommonInterest)),
        saveFilteredClosestUsers: (closestUsers) => dispatch(saveFilteredClosestUsers(closestUsers)),
    }
  }

const FriendInterestList = (props) => {

    function buildInterestList() {

        return props.friendInterestArray.map( (interest) => {
            return  <div key={interest.id}>
                        {Adapters.capitalize(interest.name)}
                        <Icon 
                            onClick={() => {
                                props.selectCommonInterests(interest)
                                console.log("userintereslist",interest)
                                Adapters.getFilteredClosestUsers(interest.id)
                                .then(resp => console.log("userintereslist", resp))
                                // .then(this.props.saveFilteredClosestUsers)
                            }}
                            color='teal' 
                            name='users' 
                        />
                        {
                            <Icon 
                            onClick={() => {
                               console.log("userintereslist")
                            }}
                            color='teal'
                            name='user close'
                        />
                        }
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