import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';

// ACTIONS
import { appendNewConversation } from '../actions'

//REDUX PROPS 
const mapStateToProps = state => {
  return {
      userId: state.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    appendNewConversation: (newConversation) => dispatch(appendNewConversation(newConversation)),
  }
}

class PresenceCable extends Component {

  handleReceivedActiveUser = (response) => {

    const { type } = response
    const { user } = response

    switch(type) {
      case "DC_USER":
        console.log(response);

        break;
      case "CO_USER":
        console.log(response);
        break;
      default:
        return null;
    }
      
  };

  render() {
    return (
            <ActionCable
                channel={{ 
                  channel: 'GlobalPresenceChannel'
                }}
                onReceived={(response) => this.handleReceivedActiveUser(response)}
            />
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PresenceCable);