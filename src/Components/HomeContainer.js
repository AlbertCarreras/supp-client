import React from 'react';

//COMPONENTS
import InterestsAside from './InterestsAside'
import UserList from './UserList'
import MessagingAside from './MessagingAside'

const HomeContainer = () => {
    return (
        <div className="home-container">
            <InterestsAside />
            <UserList />
            <MessagingAside />
        </div>
    );
};

export default HomeContainer;