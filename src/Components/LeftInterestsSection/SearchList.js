import React from 'react';
import { Icon } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

// ADAPTERS
import Adapters from './../../Adapters/Adapters';

// ACTIONS
import { selectCommonInterests, thunkSaveUserInterests, thunkSaveFilteredClosestUsers } from '../../actions';

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
        thunkSaveUserInterests: (userId, userInterestArray) => dispatch(thunkSaveUserInterests(userId, userInterestArray)),
        thunkSaveFilteredClosestUsers: (termId) => dispatch(thunkSaveFilteredClosestUsers(termId)),

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
                                props.thunkSaveFilteredClosestUsers(term.id)
                            }}
                            color='teal' 
                            name='users' 
                        />
                        { !props.userInterests.find((i)=> i.id === term.id)
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