import React from 'react';

//COMPONENTS
import InterestsAside from './LeftInterestsSection/InterestsAside'
import UserList from './CentralUsersSection/UserList'
import MessagingAside from './RightChatsSection/MessagingAside'
import PresenceCable from './PresenceCable'

const HomeContainer = () => {
    return (
        <div className="home-container">
            <PresenceCable /> {/* PresenceCable connects to websocket that handles connected-user status*/}
            <InterestsAside /> {/* Components in LeftInterestSection folder*/}
            <UserList /> {/* Components in CentralUserSection folder*/}
            <MessagingAside /> {/* Components in RightChatsSection folder*/}
        </div>
    );
};

export default HomeContainer;