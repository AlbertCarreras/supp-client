import React from 'react';
import { Icon } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

// ADAPTERS
import Adapters from './../Adapters/Adapters';

// ACTIONS
import { selectCommonInterests, addUserInterests, saveFilteredClosestUsers } from '../actions';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        selectedInterest: state.selectedCommonInterest,
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
                                Adapters.getFilteredClosestUsers(term.id)
                                .then(this.props.saveFilteredClosestUsers)
                            }} 
                            color='teal' 
                            name='users' 
                        />
                        <Icon 
                            onClick={() => props.addUserInterests(term)}
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