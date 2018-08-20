import React from 'react';

//ADAPTERS
import AdapterChats from './../Adapters/AdapterChats';

class NewMessageForm extends React.Component {
  state = {
    text: '',
    conversation_id: this.props.conversation_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ conversation_id: nextProps.conversation_id });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  //PROPS FUNCTIONALITY: Button handlers
  handleSubmit = e => {
    e.preventDefault();
    let body = {
      text: this.state.text,
      conversation_id: this.state.conversation_id,
    };

    AdapterChats.fetchToWebsocket("messages", body);
    this.setState({ text: '' });
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="Enter new message"
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewMessageForm;