import React from 'react';
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

//ADAPTERS
import AdapterChats from './../Adapters/AdapterChats';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        user_sender_id: state.userId,
    }
}

const StartChatButton = (props) => {

    function handleClick() {
        let body = {
            title: "PRIVATE",
            sender_id: props.user_sender_id, 
            receiver_id: props.user_receiver_id
        };
    
        AdapterChats.fetchToWebsocket("conversations", body);
        props.onClickClose();
      };

    return (
        <Button
            onClick={() => handleClick()}
            primary>Say <div className="btn-logo">Supp?!</div>
        </Button>
    );
};

export default connect(mapStateToProps, null)(StartChatButton);