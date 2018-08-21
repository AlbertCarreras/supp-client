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
    
    
    //WEBSOCKET FUNCTIONALITY: Receivers
    handleReceivedConversation = (response, userId = this.props.userId) => {
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
        return (
          <div className="conversationsList">
            
            <ConversationsCables
                handleReceivedConversation={this.handleReceivedConversation}
            />
            
            {this.props.conversations.length ? (
              <MessagesCables
                conversations={this.props.conversations}
                handleReceivedMessage={this.handleReceivedMessage}
              />
            ) : null}
            
            <h2 className="heart-message">Conversations</h2>
            
            {this.mapConversations()}
            
            { 
              this.props.selectedConversation 
              ? <MessagesArea />
              : null
            }
            
          </div>
        );
      };
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(ConversationsList);