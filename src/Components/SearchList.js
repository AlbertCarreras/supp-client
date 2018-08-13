import React from 'react';
import { Icon } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

// ADAPTERS
import Adapters from './../Adapters/Adapters';
import AdapterUser from './../Adapters/AdapterUser';

// ACTIONS
import { selectCommonInterests, addUserInterests, saveFilteredClosestUsers } from '../actions';

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
        addUserInterests: (selectedUserInterest) => dispatch(addUserInterests(selectedUserInterest)),
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
                                props.addUserInterests(term)
                                AdapterUser.persistAddInterests(props.userId, 
                                    [{id: 34, name: "bird watching"}, {id: 22, name: "auto audiophilia"}])
                                .then(console.log)
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