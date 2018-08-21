import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';

// ACTIONS
import { appendNewConversation } from '../actions'

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      userId: state.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    appendNewConversation: (newConversation) => dispatch(appendNewConversation(newConversation)),
  }
}

class ConversationsCables extends Component {

  handleReceivedConversation = (response) => {
    debugger
    const { conversation } = response;
    if (conversation.users.map((i)=> i.id).includes(this.props.userId)) {
      this.props.appendNewConversation(conversation);
    }
  };

  render() {
    return (
            <ActionCable
                channel={{ 
                  channel: 'ConversationsChannel'
                }}
                onReceived={(response) => this.handleReceivedConversation(response)}
            />
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsCables);