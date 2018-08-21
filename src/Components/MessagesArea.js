import React from 'react';
import NewMessageForm from './NewMessageForm';
import { connect } from 'react-redux';
// import { Icon } from 'semantic-ui-react'

// //ADAPTERS
// import Adapters from './../Adapters/Adapters';

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      userId: state.userId,
      selectedConversation: state.selectedConversation,
  }
}

const MessagesArea = (props) => {

  function orderedMessages () {
    const sortedMessages = props.selectedConversation.messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    return sortedMessages.map(message => {
      return  <div 
                key={message.id}
                className="message-box"
              >
                <p>{message.text}</p>
              </div>;
    });
  };

  return (
    <div className="messagesArea">
      <h2>{props.selectedConversation.title}</h2>
      <ul>{orderedMessages()}</ul>
      <NewMessageForm conversation_id={props.selectedConversation.id} />
    </div>
  );
};

// const MessagesArea = (props) => {

//   function friendUser () {
//     return props.conversation.users.find((u) => u.id !== props.userId).username
//   }

//   function orderedMessages () {
//     const sortedMessages = props.conversation.messages.sort(
//       (a, b) => new Date(a.created_at) - new Date(b.created_at)
//     );
//     return sortedMessages.map(message => {
//       return  <div 
//                 key={message.id}
//                 className="message-box"
//               >
//                 <p>{Adapters.capitalize(message.user.username)}:</p>
//                 <p>{}</p>
//                 <p>{message.text}</p>
//               </div>;
//     });
//   };

//   return (
//     <div className="messagesArea">
//       <h2 className="heart-message">
//         <Icon 
//         color='teal' 
//         name='chat'
//         /> 
//         with {Adapters.capitalize(friendUser())}
//       </h2>
//       {orderedMessages()}
//       <NewMessageForm conversation_id={props.conversation.id} />
//     </div>
//   );
// };

export default connect(mapStateToProps, null)(MessagesArea);