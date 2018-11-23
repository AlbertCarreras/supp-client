import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

// ACTIONS
import { displayScreenContainers } from './../Actions/containerDisplayActions';

// REDUX PROPS 
const mapDispatchToProps = dispatch => {
  return {
    displayScreenContainers: (chatAction, interestAction) => dispatch(displayScreenContainers(chatAction, interestAction))  
}}

const mapStateToProps = state => {
  return {
    showChatContainer: state.containerDisplay.showChatContainer,
    showInterestsContainer: state.containerDisplay.showInterestsContainer, 
    loggedIn: state.userAuth.loggedIn
  }
}

const IconMenuHeader = (props) => {

    function handleClick(iconSelected) {
        var chatAction;
        var interestAction;
        if (iconSelected === "interest") {
            if ((!props.showChatContainer && !props.showInterestsContainer) || (props.showChatContainer && !props.showInterestsContainer)) {
                chatAction = false;
                interestAction = true;          
            } else {
                chatAction = false;
                interestAction = false;          
            }
        } else if (iconSelected === "chat") {
            if ((!props.showChatContainer && !props.showInterestsContainer) || (!props.showChatContainer && props.showInterestsContainer)) {
                chatAction = true;
                interestAction = false;          
            } else {
                chatAction = false;
                interestAction = false;          
            }
        }
        props.displayScreenContainers(chatAction, interestAction)
    }

    return (
        props.loggedIn 
            ? <Fragment>
                <Icon 
                    color='teal' 
                    name='list alternate'
                    onClick={() => handleClick("interest")}
                />
                <Icon 
                    color='teal' 
                    name='chat' 
                    onClick={() => handleClick("chat")}
                />
            </Fragment>
            : null
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(IconMenuHeader);