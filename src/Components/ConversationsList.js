import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { thunkSaveConversations, saveSelectedConversation } from '../actions'

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
  }
}

class ConversationsList extends React.Component {
    
    componentDidMount = () => {
      this.props.thunkSaveConversations();
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
        
    render = () => {
        return (
          <div className="conversations-box">
            
            {/*cables connected to backend websockets*/}
            <ConversationsCables />
            {this.props.conversations.length
              ? <MessagesCables />
              : null
            }
            
            <h2 className="heart-message">Conversations</h2>
            <div className="conversations-list">
              {this.mapConversations()}
            </div>
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