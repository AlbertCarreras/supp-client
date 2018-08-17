import React from 'react';
import { Icon } from 'semantic-ui-react'

//ADAPTERS
import AdapterChats from './../Adapters/AdapterChats';

class NewConversationForm extends React.Component {
  state = {
    title: ''
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let body = {
      title: this.state.title,
      submitter_id: 1, //default alberto for now!
      receiver_id: 19 //default avi for now! should be live based on clicks and user
    };

    AdapterChats.fetchToWebsocket("conversations", body);
    this.setState({ title: '' });
  };

  render = () => {
    return (
      <div className="newConversationForm">
        <form onSubmit={this.handleSubmit}>
          <p className="animated bounceIn delay-5s">Start a new conversation here 
          <Icon 
              color='teal' 
              name='arrow down' 
          />
          </p>
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewConversationForm;
