import React from 'react';
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

//ADAPTERS
import AdapterChats from './../Adapters/AdapterChats';

// ACTIONS
import { saveSelectedConversation } from '../actions'

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        user_sender_id: state.userId,
        conversations: state.conversations,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      saveSelectedConversation: (selectedConversationId) => dispatch(saveSelectedConversation(selectedConversationId)),
    }
}

const StartChatButton = (props) => {

    function conversationExists(userReceiverId) {
        let conversationFound = props.conversations.filter((conversation) => conversation.users.map((i)=> i.id).includes(userReceiverId));

        if (conversationFound.length > 0) {
            props.saveSelectedConversation(conversationFound[0]);
            return true;
        }
    }

    function handleClick() {
        let body = {
            title: "PRIVATE",
            sender_id: props.user_sender_id, 
            receiver_id: props.user_receiver_id
        };
    
        if (conversationExists(props.user_receiver_id)) {
            props.onClickClose();
        }
        else {
            AdapterChats.fetchToWebsocket("conversations", body);
            props.onClickClose();
        }
    };

    return (
        <Button
            onClick={() => handleClick()}
            primary>Say <div className="btn-logo">Supp?!</div>
        </Button>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(StartChatButton);