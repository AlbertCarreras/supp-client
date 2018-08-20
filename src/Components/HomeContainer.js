import React from 'react';

//COMPONENTS
import InterestsAside from './InterestsAside'
import UserList from './UserList'
// import MessagingAside from './MessagingAside'

// <MessagingAside />

const HomeContainer = () => {
    return (
        <div className="home-container">
            <InterestsAside />
            <UserList />
        </div>
    );
};

export default HomeContainer;