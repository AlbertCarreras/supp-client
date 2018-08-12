import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

// ADAPTERS
import Adapters from './../Adapters/Adapters';

const SearchList = (props) => {

    function buildInterestList() {
       return props.searchTermArray.map( (term) => {
            return <p key={term.id}>{Adapters.capitalize(term.name)}</p>
        })
    }

    return (
        <div className="interest-list">
            {buildInterestList()}
        </div>
    )
};

export default withRouter(SearchList);