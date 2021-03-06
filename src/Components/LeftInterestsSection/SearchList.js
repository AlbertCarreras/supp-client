import React from 'react';
import { Icon } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

// ADAPTERS
import Adapters from './../../Adapters/Adapters';

// ACTIONS
import { selectCommonInterests, thunkSaveUserInterests } from './../../Actions/userInterestsActions';
import { thunkSaveFilteredClosestUsers } from './../../Actions/userFriendsActions';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        selectedInterest: state.userInterests.selectedCommonInterest,
        userInterests: state.userInterests.userInterests,
        userId: state.userAuth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectCommonInterests: (selectedCommonInterest) => dispatch(selectCommonInterests(selectedCommonInterest)),
        thunkSaveUserInterests: (userId, userInterestArray) => dispatch(thunkSaveUserInterests(userId, userInterestArray)),
        thunkSaveFilteredClosestUsers: (termId) => dispatch(thunkSaveFilteredClosestUsers(termId)),

    }
  }

const SearchList = (props) => {

    function buildInterestList() {
        let searchTermArray = props.searchTermArray
        // Filter the returned array of interests so it does not display an interest that has been selected to find matching people.
        if (props.selectedInterest !== undefined) {
            searchTermArray = searchTermArray.filter((term) => term !== props.selectedInterest)
        }

        return searchTermArray.map( (term) => {
            //Map over the returned array of interests. Add icons with functionality: add interests to user list or select interest from which to look for matching people with same interests.
            return  <div key={term.id}>
                        {Adapters.capitalize(term.name)}
                        <Icon 
                            onClick={() => {
                                props.selectCommonInterests(term)
                                props.thunkSaveFilteredClosestUsers(term.id)
                            }}
                            color='teal' 
                            name='users' 
                        />
                        { 
                            //If the user already has interest in their list, don't display icon to add again.
                            !props.userInterests.find((i)=> i.id === term.id)
                            ?   <Icon 
                                    onClick={() => {
                                        props.thunkSaveUserInterests(props.userId, term)
                                    }}
                                    color='teal'
                                    name='user plus'
                                />
                            : null
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchList));