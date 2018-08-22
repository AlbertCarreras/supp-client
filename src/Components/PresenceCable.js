import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';

// ACTIONS
// import { appendNewConversation } from '../actions'

// REDUX PROPS 
// const mapStateToProps = state => {
//   return {
//       userId: state.userId,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     appendNewConversation: (newConversation) => dispatch(appendNewConversation(newConversation)),
//   }
// }

class ConversationsCables extends Component {

  handleReceivedActiveUser = (response) => {
    // debugger
    // const { conversation } = response;
    // if (conversation.users.map((i)=> i.id).includes(this.props.userId)) {
    //   this.props.appendNewConversation(conversation);
    // }
    // const { type } = response
    // switch(type) {
    //   case "DC_USER":
    //     debugger;
    //   case "CO_USER":
    //     debugger;
    // }
     console.log(response)
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

export default ConversationsCables;

// export default connect(mapStateToProps, mapDispatchToProps)(ConversationsCables);