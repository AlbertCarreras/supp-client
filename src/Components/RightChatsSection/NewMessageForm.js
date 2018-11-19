import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

//ADAPTERS
import AdapterChats from './../../Adapters/AdapterChats';

const mapStateToProps = state => {
  return {
      userId: state.userAuth.userId,
      selectedConversation: state.userConversations.selectedConversation,
  }
}

class NewMessageForm extends Component {
  // keeping local state for controlled inputs
  state = {
    text: '',
  };

  //Bad-words functionality
  handleChange = e => {
    var Filter = require('bad-words'),
        filter = new Filter();
        filter.addWords("suck")
        filter.removeWords("hell")
    this.setState({ text: filter.clean(e.target.value) });
  };

  //PROPS FUNCTIONALITY: Button handlers

  pressedEnter = (event) => {
    if (event.key === "Enter" ) {
      this.handleSubmit();
    }
  }

  handleSubmit = () => {    
    // Variable containing new message information to persist  
    let body = {
      text: this.state.text,
      conversation_id: this.props.selectedConversation.id,
    };

    AdapterChats.fetchToWebsocket("messages", body);
    this.setState({ text: '' });
  };

  render = () => {
    return (
      <div className="new-message-form">
          <textarea
            className="new-message-input"
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            onKeyDown={this.pressedEnter}
            placeholder="Enter new message"
          />
          <div 
            className="chat-submit-btn"
            onClick={this.handleSubmit}
          >
            <Icon 
              color='teal' 
              name='send'
            />
            <p className="footer-logo">Suppmit</p>
          </div>
      </div>
    );
  };
}

export default connect(mapStateToProps, null)(NewMessageForm);