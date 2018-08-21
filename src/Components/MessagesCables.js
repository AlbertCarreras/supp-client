import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { connect } from 'react-redux';

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      conversations: state.conversations,
  }
}

const MessagesCables = (props) => {

  function handleReceivedMessage (response) {
    console.log(response)
      const { message } = response;
      const conversations = [...this.state.conversations];
      const conversation = conversations.find(
        conversation => conversation.id === message.conversation_id
      );
      conversation.messages = [...conversation.messages, message];
      this.setState({ conversations });
  };

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
      })}
    </Fragment>
  );
};

export default connect(mapStateToProps, null)(MessagesCables);