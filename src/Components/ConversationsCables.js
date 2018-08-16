import React from 'react';
import { ActionCable } from 'react-actioncable-provider';

const MessagesCables = ({ handleReceivedConversation }) => {
  return (
          <ActionCable
              channel={{ channel: 'ConversationsChannel' }}
              onReceived={handleReceivedConversation}
          />
  );
};

export default MessagesCables;
