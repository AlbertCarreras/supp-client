import React from 'react';

//COMPONENTS
import InterestsAside from './InterestsAside'
import UserList from './UserList'
import MessagingAside from './MessagingAside'
import PresenceCable from './PresenceCable'

const HomeContainer = () => {
    return (
        <div className="home-container">
            <PresenceCable />
            <InterestsAside />
            <UserList />
            <MessagingAside />
        </div>
    );
};

export default HomeContainer;