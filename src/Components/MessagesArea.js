import React from 'react';
import NewMessageForm from './NewMessageForm';

const MessagesArea = ({conversation: { id, title, messages },}) => {

  function orderedMessages (messages) {
    const sortedMessages = messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    return sortedMessages.map(message => {
      return <div key={message.id}>{message.text}</div>;
    });
  };

  return (
    <div className="messagesArea">
      {orderedMessages(messages)}
      <NewMessageForm conversation_id={id} />
    </div>
  );
};

export default MessagesArea;