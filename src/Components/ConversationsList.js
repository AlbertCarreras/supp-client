import React from 'react';

//ADAPTERS
import { API_ROOT } from './../Adapters/AdapterConstants';

//COMPONENTS
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import MessagesCables from './MessagesCables';
import ConversationsCables from './ConversationsCables';

class ConversationsList extends React.Component {
    state = {
      conversations: [],
      activeConversation: null
    };
    
    componentDidMount = () => {
        fetch(`${API_ROOT}/conversations`)
          .then(res => res.json())
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
    handleReceivedConversation = response => {
        const { conversation } = response;
        this.setState({
          conversations: [...this.state.conversations, conversation]
        });
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
    
    export default ConversationsList;
    