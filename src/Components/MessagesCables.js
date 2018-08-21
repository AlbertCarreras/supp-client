import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';

// // ACTIONS
// import { thunkUpdateConversation } from '../actions'

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      conversations: state.conversations,
  }
}

class MessagesCables extends Component {

  handleReceivedMessage = (response) => {
    console.log(response)
      const { message } = response;
      const conversations = [...this.props.conversations];
      const conversation = conversations.find(
        conversation => conversation.id === message.conversation_id
      );
      conversation.messages = [...conversation.messages, message];
      
  };
  render () {
    return (
      <Fragment>
        {props.conversations.map(conversation => {
          return (
            <ActionCable
              key={conversation.id}  //mapping purposes
              channel={{ 
                channel: 'MessagesChannel', 
                conversation: conversation.id }}
              onReceived={handleReceivedMessage}
            />
          );
        })};
      </Fragment>
    }
  );
};

export default connect(mapStateToProps, null)(MessagesCables);