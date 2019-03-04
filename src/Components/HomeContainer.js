import React from 'react';
import { connect } from 'react-redux';

//COMPONENTS
import InterestsAside from './LeftInterestsSection/InterestsAside'
import UserList from './CentralUsersSection/UserList'
import MessagingAside from './RightChatsSection/MessagingAside'
import PresenceCable from './PresenceCable'
import ConversationsCables from './RightChatsSection/ConversationsCables';

// REDUX PROPS   
const mapStateToProps = state => {
return {
    showChatContainer: state.containerDisplay.showChatContainer,
    showInterestsContainer: state.containerDisplay.showInterestsContainer
}}

const HomeContainer = (props) => {
    window.Appcues.track("Entered site");
    return (
        <div className="home-container">
            <PresenceCable /> {/* PresenceCable connects to websocket that handles connected-user status*/}
            {/* Cables connected to backend websockets */}
            <ConversationsCables />
            <div className="screen-inner-home-container">
                {props.showChatContainer 
                    ? <MessagingAside />
                    : null}
                {props.showInterestsContainer ? <InterestsAside /> : null}
                <UserList /> {/* Components in CentralUserSection folder*/}
            </div>
            <div className="inner-home-container">
                <InterestsAside /> {/* Components in LeftInterestSection folder*/}
                <UserList /> {/* Components in CentralUserSection folder*/}
                <MessagingAside /> {/* Components in RightChatsSection folder*/}
            </div>
        </div>
    );
};

export default connect(mapStateToProps, null)(HomeContainer);