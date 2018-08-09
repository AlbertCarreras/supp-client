import React from 'react';

//COMPONENTS
import FilterContainer from './FilterContainer'
import CentralContainer from './CentralContainer'
import MessagingContainer from './MessagingContainer'

const HomeContainer = () => {
    return (
        <div className="home-container">
            <FilterContainer />
            <CentralContainer />
            <MessagingContainer />
        </div>
    );
};

export default HomeContainer;