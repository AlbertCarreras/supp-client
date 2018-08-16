import React, { Component } from 'react';

//COMPONENTS
import ConversationsList from  './ConversationsList'

class MessagingAside extends Component {
    render() {
        return (
            <div className="aside messaging-container">
                <ConversationsList />
            </div>
        );
    }
}

export default MessagingAside;