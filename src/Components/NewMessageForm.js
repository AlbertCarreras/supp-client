import React from 'react';
import { connect } from 'react-redux';

//ADAPTERS
import AdapterChats from './../Adapters/AdapterChats';

const mapStateToProps = state => {
  return {
      userId: state.userId,
      selectedConversation: state.selectedConversation,
  }
}

class NewMessageForm extends React.Component {
  state = {
    text: '',
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
      conversation_id: this.props.selectedConversation.id,
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

export default connect(mapStateToProps, null)(NewMessageForm);