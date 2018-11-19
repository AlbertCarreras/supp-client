import React from 'react';
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

//ADAPTERS
import AdapterChats from '../../Adapters/AdapterChats';

// ACTIONS
import { saveSelectedConversation } from '../../actions'

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        user_sender_id: state.userAuth.userId,
        conversations: state.userConversations.conversations,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      saveSelectedConversation: (selectedConversationId) => dispatch(saveSelectedConversation(selectedConversationId)),
    }
}

const StartChatButton = (props) => {
    
    //Check if the list of conversations -each one of them including their belonging users- includes the user id of the selected profile (the other user). If it is found, save in state the selected conversation. 
    function conversationExists(userReceiverId) {
        let conversationFound = props.conversations.filter((conversation) => conversation.users.map((i)=> i.id).includes(userReceiverId));

        if (conversationFound.length > 0) {
            props.saveSelectedConversation(conversationFound[0]);
            return true;
        }
    }

    function handleClick() {

        // The body variable contains both users in the conversation. Logged user and the selected user to chat with. The variable will be used in the server as params to create a new conversation belonging to both users. 
        let body = {
            title: "PRIVATE",
            sender_id: props.user_sender_id, 
            receiver_id: props.user_receiver_id
        };
    
        // If the conversation already exists, close modal. Otherwise, create a new conversation, persisted so it gets broadcasted.
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