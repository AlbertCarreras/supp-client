import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const MessagesCables = ({ handleReceivedConversation }) => {
  return (
          <ActionCable
              channel={{ channel: 'ConversationsChannel' }}
              onReceived={this.handleReceivedConversation}
          />
  );
};

export default MessagesCables;
