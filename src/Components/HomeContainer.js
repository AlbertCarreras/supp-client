import React from 'react';
import { connect } from 'react-redux';

//COMPONENTS
import InterestsAside from './LeftInterestsSection/InterestsAside'
import UserList from './CentralUsersSection/UserList'
import MessagingAside from './RightChatsSection/MessagingAside'
import PresenceCable from './PresenceCable'

// REDUX PROPS   
const mapStateToProps = state => {
return {
    showChatContainer: state.containerDisplay.showChatContainer,
    showInterestsContainer: state.containerDisplay.showInterestsContainer
}}

const HomeContainer = (props) => {

    return (
        <div className="home-container">
            <PresenceCable /> {/* PresenceCable connects to websocket that handles connected-user status*/}
            <div className="screen-inner-home-container">
                {console.log(props.showChatContainer, props.showInterestsContainer)}
                {props.showChatContainer ? <MessagingAside /> : null}
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