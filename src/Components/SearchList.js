import React from 'react';
import { Icon } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

// ADAPTERS
import Adapters from './../Adapters/Adapters';

// ACTIONS
import { selectCommonInterests } from '../actions';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        selectedInterest: state.selectedCommonInterest,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectCommonInterests: (selectedCommonInterest) => dispatch(selectCommonInterests(selectedCommonInterest))
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
                        <Icon onClick={
                            () => props.selectCommonInterests(term)                        
                        } color='teal' name='add' />
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