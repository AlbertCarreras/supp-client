import React from 'react';
import { connect } from 'react-redux';

//ADAPTERS
import AdapterChats from './../Adapters/AdapterChats';

//COMPONENTS
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import MessagesCables from './MessagesCables';
import ConversationsCables from './ConversationsCables';

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      userId: state.userId,
  }
}

class ConversationsList extends React.Component {
    state = {
      conversations: [],
      activeConversation: null
    };
    
    componentDidMount = () => {
      AdapterChats.getConversations()
      .then(conversations => this.setState({ conversations }));
    };
    
    //HELPERS
    findActiveConversation = (conversations, activeConversation) => {
        return conversations.find(
          conversation => conversation.id === activeConversation
        );
      };
      
    mapConversations = (conversations, handleClick) => {
        return conversations.map(conversation => {
          return (
            <div key={conversation.id} onClick={() => handleClick(conversation.id)}>
              {conversation.title}
            </div>
          );
        });
      };
    
    //PROPS FUNCTIONALITY: Button handlers
    handleClick = id => {
        this.setState({ activeConversation: id });
    };
    
    //WEBSOCKET FUNCTIONALITY: Receivers
    handleReceivedConversation = (response, userId = this.props.userId) => {
      const { conversation } = response;
      if (conversation.users.map((i)=> i.id).includes(userId)) {
        this.setState({
          conversations: [...this.state.conversations, conversation]
        });
      }
    };

    handleReceivedMessage = response => {
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
            
            <ul>
                {this.mapConversations(conversations, this.handleClick)}
            </ul>
            
            <NewConversationForm />

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
    
    export default connect(mapStateToProps, null)(ConversationsList);