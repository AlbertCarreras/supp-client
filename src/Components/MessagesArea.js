import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

//ADAPTERS
import Adapters from './../Adapters/Adapters';

//COMPONENTS
import NewMessageForm from './NewMessageForm';
import ProfileModal from './ProfileModal';


// ACTIONS
import { cleanSelectedConversation } from '../actions'

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      userId: state.userId,
      conversations: state.conversations,
      selectedConversation: state.selectedConversation,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cleanSelectedConversation: () => dispatch(cleanSelectedConversation()),
  }
}

const MessagesArea = (props) => {
  
  function friendUser () {
      return props.selectedConversation.users.find((u) => u.id !== props.userId)
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
              <p>{`${Adapters.capitalize(message.user.username)}: ${message.text}`}</p>
              </div>;
    });
  };

  return (
    <div className="messages-box animated slideInUp delay-5s">
      <div className="messages-header">
          <div className="chat-header-title">
              <Icon 
              color='teal' 
              name='chat'
              /> 
              with {Adapters.capitalize(friendUser().username)}
          </div>
          <ProfileModal 
            origin={"chatHeader"}
            bio={friendUser().bio}
            userId={friendUser().id}
            username={friendUser().username}
            interests={friendUser().interests}
            profileImageLink={friendUser().profile_image_url}
            distance={
              friendUser().distance < 1 
                    ? `${(friendUser().distance * 5280).toFixed(1)} ft`
                    : `${(friendUser().distance).toFixed(1)} mi`
            }
          />
      </div>
      <div className="outer-messages-list">
        <div className="messages-list">
          {orderedMessages()}
        </div>
      </div>
      <NewMessageForm conversation_id={props.selectedConversation.id} />
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(MessagesArea);