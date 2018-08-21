import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

//ADAPTERS
import Adapters from './../Adapters/Adapters';

//COMPONENTS
import NewMessageForm from './NewMessageForm';

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      userId: state.userId,
      conversations: state.conversations,
      selectedConversation: state.selectedConversation,
  }
}

const MessagesArea = (props) => {

  function friendUser () {
      return props.selectedConversation.users.find((u) => u.id !== props.userId).username
  }

  function orderedMessages () {
    const sortedMessages = props.selectedConversation.messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    return sortedMessages.map(message => {
      return  <div 
                key={message.id}
                className="message-box"
              >
              <p>{Adapters.capitalize(message.user.username)}:</p>
                <p>{message.text}</p>
              </div>;
    });
  };

  return (
    <div className="messages-box">
      <h2 className="heart-message">
          <Icon 
          color='teal' 
          name='chat'
          /> 
          with {Adapters.capitalize(friendUser())}
      </h2>
      <div className="outer-messages-list">
        <div className="messages-list">
          {orderedMessages()}
        </div>
      </div>
      <NewMessageForm conversation_id={props.selectedConversation.id} />
    </div>
  );
};


export default connect(mapStateToProps, null)(MessagesArea);