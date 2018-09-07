import React from 'react';

//COMPONENTS
import InterestsAside from './LeftInterestsSection/InterestsAside'
import UserList from './CentralUsersSection/UserList'
import MessagingAside from './RightChatsSection/MessagingAside'
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