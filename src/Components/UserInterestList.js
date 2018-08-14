import React from 'react';
import { Icon } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

// ADAPTERS
import Adapters from './../Adapters/Adapters';
import AdapterUser from './../Adapters/AdapterUser';


// ACTIONS
import { selectCommonInterests, saveFilteredClosestUsers, saveUserInterests } from '../actions';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        userInterests: state.userInterests,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectCommonInterests: (selectedCommonInterest) => dispatch(selectCommonInterests(selectedCommonInterest)),
        saveUserInterests: (userInterests) => dispatch(saveUserInterests(userInterests)),
        saveFilteredClosestUsers: (closestUsers) => dispatch(saveFilteredClosestUsers(closestUsers)),
    }
  }

const UserInterestList = (props) => {

    function buildInterestList() {

        return props.userInterests.map( (interest) => {
            return  <div key={interest.id}>
                        {Adapters.capitalize(interest.name)}
                        <Icon 
                            onClick={() => {
                                props.selectCommonInterests(interest)
                                Adapters.getFilteredClosestUsers(interest.id)
                                .then(props.saveFilteredClosestUsers)
                            }}
                            color='teal' 
                            name='users' 
                        />
                        <Icon 
                            onClick={() => {
                                AdapterUser.persistRemoveInterests(interest)
                                .then(resp => props.saveUserInterests(resp.interests))
                            }}
                            color='teal'
                            name='user close'
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserInterestList));