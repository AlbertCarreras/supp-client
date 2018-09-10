import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

//ADAPTERS
import Adapters from './../../Adapters/Adapters';

//COMPONENTS
import NewMessageForm from './NewMessageForm';
import ProfileModal from './../CentralUsersSection/ProfileModal';


// ACTIONS
import { cleanSelectedConversation } from '../../actions'

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

// STYLE CONSTANTS
// Style for user message backgrounds to create alternate colors and alignment to identify users.
const divStyleUser = {
  background: 'rgba(92, 219, 149, 0.25)',
  textAlign: 'right',
};

const divStyleFriend = {
  background: 'rgba(55,150,131, 0.25)',
};


const MessagesArea = (props) => {
  
  // Check if the message belongs to the logged user in state. Style accordingly.  
  function isUser (userId) {
    if (userId === props.userId) {
        return  divStyleUser
    }
    else {
        return divStyleFriend
    }
  }

  // Get time message was created and return formated time.  
  function getTime (timestamp) {
      var time = new Date(timestamp)
      return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }
    
  // Get the users from the serialized data in the conversation. Find and return the user is not the logged user in state.
  function friendUser () {
      return props.selectedConversation.users.find((u) => u.id !== props.userId)
  }

  // Get messages from the selected conversation. Sort by the date the message was created.
  function sortConversations () {
    return props.selectedConversation.messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    )
  }

  // Map over the sorted array of messages in order to build a formatted thread of messages using helper functions.
  function displayMessages () {
    return sortConversations().map(message => {
      return  <div 
                key={message.id}
                className="message-box"
                style={isUser(message.user.id)}
              >
              <div className="message-box-wrapper">
                <div 
                  className="message-box-time"
                >
                  {getTime(message.created_at)}
                  {Adapters.capitalize(message.user.username)}
                </div>
                <div className="message-box-content">
                  {message.text}
                </div>
              </div>
              </div>;
    });
  };

  return (
    // Build formatted chat box
    <div className="messages-box animated slideInUp delay-5s">
      <div className="messages-header">
          <div className="chat-header-title">
              <Icon 
                color='teal' 
                name='chat'
              /> 
              with {Adapters.capitalize(friendUser().username)}
          </div>
            {/* Round user profile image that triggers profile modal. Information for modal comes from the serialized user data in the conversation */}
            <ProfileModal 
              origin={"chatHeader"}
              bio={friendUser().bio}
              userId={friendUser().id}
              username={friendUser().username}
              interests={friendUser().interests}
              profileImageLink={friendUser().profile_image_url}
              distance={
                Adapters.getReadableDistance(friendUser().distance)
              }
          />
          {/* Round user profile image that triggers profile modal. Information for modal comes from the serialized user data in the conversation */}
          <Icon 
              onClick={props.cleanSelectedConversation}
              color='teal' 
              name='close'
          />
      </div>
      <div className="outer-messages-list">
        <div className="messages-list">
          {displayMessages()}
        </div>
      </div>
      <NewMessageForm conversation_id={props.selectedConversation.id} />
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(MessagesArea);