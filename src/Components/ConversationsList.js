import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { thunkSaveConversations, saveSelectedConversation, appendNewConversation } from '../actions'


//COMPONENTS
import MessagesArea from './MessagesArea';
import MessagesCables from './MessagesCables';
import ConversationsCables from './ConversationsCables';
import Conversation from './Conversation';

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
    thunkSaveConversations: () => dispatch(thunkSaveConversations()),
    saveSelectedConversation: (selectedConversationId) => dispatch(saveSelectedConversation(selectedConversationId)),
    appendNewConversation: (newConversation) => dispatch(appendNewConversation(newConversation)),
  }
}

class ConversationsList extends React.Component {
    state = {
      conversations: [],
      activeConversation: null
    };
    
    componentDidMount = () => {
      this.props.thunkSaveConversations();
    };
    
    //HELPERS
    findActiveConversation = (conversations, activeConversation) => {
        return conversations.find(
          conversation => conversation.id === activeConversation
        );
      };
    
    mapConversations = () => {
      debugger;
        return this.props.conversations.map(conversation => {
          return (
            <div 
              key={conversation.id} 
              className="conversation-box"
              onClick={() => this.props.saveSelectedConversation(conversation.id)}
            >
              <Conversation 
                conversation={conversation}
              />
            </div> 

          );
        });
      };
    
    
    //WEBSOCKET FUNCTIONALITY: Receivers
    handleReceivedConversation = (response, userId = this.props.userId) => {
      debugger;
      const { conversation } = response;
      if (conversation.users.map((i)=> i.id).includes(userId)) {
       
        this.props.appendNewConversation(conversation)
    
      }
    };

    handleReceivedMessage = response => {
      console.log(response)
        const { message } = response;
        const conversations = [...this.state.conversations];
        const conversation = conversations.find(
          conversation => conversation.id === message.conversation_id
        );
        conversation.messages = [...conversation.messages, message];
        this.setState({ conversations });
    };
    
    render = () => {
        const { conversations, activeConversation } = this.state;
        return (
          <div className="conversationsList">
            
            <ConversationsCables
                handleReceivedConversation={this.handleReceivedConversation}
            />
            
            {this.state.conversations.length ? (
              <MessagesCables
                conversations={conversations}
                handleReceivedMessage={this.handleReceivedMessage}
              />
            ) : null}
            
            <h2 className="heart-message">Conversations</h2>
            
            {this.mapConversations()}
            
            { 
              activeConversation ? (
                <MessagesArea
                    conversation={this.findActiveConversation(
                    conversations,
                    activeConversation
                    )}
                />
                ) : null
            }
            
          </div>
        );
      };
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(ConversationsList);