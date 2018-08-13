import React from 'react';
import { Icon } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

// ADAPTERS
import Adapters from './../Adapters/Adapters';
import AdapterUser from './../Adapters/AdapterUser';

// ACTIONS
import { selectCommonInterests, saveUserInterests, saveFilteredClosestUsers } from '../actions';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        selectedInterest: state.selectedCommonInterest,
        userInterests: state.userInterests,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectCommonInterests: (selectedCommonInterest) => dispatch(selectCommonInterests(selectedCommonInterest)),
        saveUserInterests: (userInterestArray) => dispatch(saveUserInterests(userInterestArray)),
        saveFilteredClosestUsers: (closestUsers) => dispatch(saveFilteredClosestUsers(closestUsers)),

    }
  }

const SearchList = (props) => {

    function buildInterestList() {
        let searchTermArray = props.searchTermArray
    
        if (props.selectedInterest !== undefined) {
            searchTermArray = searchTermArray.filter((term) => term !== props.selectedInterest)
        }

        return searchTermArray.map( (term) => {
            return  <div key={term.id}>
                        {Adapters.capitalize(term.name)}
                        <Icon 
                            onClick={() => {
                                props.selectCommonInterests(term)
                                console.log(term)
                                Adapters.getFilteredClosestUsers(term.id)
                                .then(console.log)
                                // .then(this.props.saveFilteredClosestUsers)
                            }}
                            color='teal' 
                            name='users' 
                        />
                        <Icon 
                            onClick={() => {
                                AdapterUser.persistAddInterests(props.userId, term)
                                .then(resp => props.saveUserInterests(resp))
                            }}
                            color='teal'
                            name='user plus'
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchList));