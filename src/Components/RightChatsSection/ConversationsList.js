import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { thunkSaveConversations, saveSelectedConversation } from './../../Actions/userConversationsActions'

//COMPONENTS
import MessagesArea from './MessagesArea';
import MessagesCables from './MessagesCables';
import Conversation from './Conversation';

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      userId: state.userAuth.userId,
      conversations: state.userConversations.conversations,
      selectedConversation: state.userConversations.selectedConversation,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    thunkSaveConversations: () => dispatch(thunkSaveConversations()),
    saveSelectedConversation: (selectedConversationId) => dispatch(saveSelectedConversation(selectedConversationId)),
  }
}

class ConversationsList extends React.Component {
    
    // When the components mounts, fetch the user conversations from the server
    componentDidMount = () => {
      this.props.thunkSaveConversations();
    };
    
    // Map conversations in state and display a formated list of them. If clicked, the conversation gets selected and displayed in chat box.
    mapConversations = () => {
        return this.props.conversations.map(conversation => {
          return (
            <div 
              key={conversation.id} 
              className="conversation-box"
              onClick={() => this.props.saveSelectedConversation(conversation)}
            >
              <Conversation 
                conversation={conversation}
              />
            </div> 

          );
        });
      };
        
    render = () => {
        return (
          <div className="conversations-box">
            {
              // Check if there are conversations in state. If so, connect each conversation to the messages channel and handle received broadcasted messages
              this.props.conversations.length
              ? <MessagesCables />
              : null
            }
            
            <h2 className="heart-message">Conversations</h2>
            <div className="conversations-list">
              { this.mapConversations() }
            </div>
            { 
              // Check if there is a selected conversations in state. If so, open the chat box with all the conversation messages
              this.props.selectedConversation 
              ? <MessagesArea />
              : null
            }
            
          </div>
        );
      };
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(ConversationsList);