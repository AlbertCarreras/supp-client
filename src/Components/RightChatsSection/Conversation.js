import React, { Fragment } from 'react';
import { connect } from 'react-redux';

//ADAPTERS
import Adapters from './../../Adapters/Adapters';
import { config } from './../../Adapters/AdapterConstants';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        userId: state.userAuth.userId,
        conversations: state.userConversations.conversations,
    }
}

const Conversation = (props) => {

    function findConversationUser () {
        return props.conversation.users.find((u) => u.id !== props.userId)
    }

    function returnImage () {
        var conversationUser = findConversationUser()
        if ( conversationUser.profile_image_url !== "undefined" ) {
            return `${config.url.API_SHORT_ROOT+props.conversation.users.find((u) => u.id !== props.userId).profile_image_url}`
        } 
        else {
            return config.url.GITHUB_URL_ROOT+`/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
        }
    }

    function returnFirstLine () {
        return props.conversation.messages.length === 0
        ?   <div className="conversation-first-message">
                <p>Start a conversation!</p>
            </div> 
        :   <div className="conversation-first-message">
                {Adapters.capitalize(props.conversation.messages[(props.conversation.messages.length)-1].user.username)}: {`${props.conversation.messages[(props.conversation.messages.length)-1].text.substring(0, 15)}...`}
            </div> 
    }


    return (
        <Fragment>
        {/* Top Conversation List >> Individual box */}
        {/* Check if user has profile image. If not display animal avatar. */}
        <div className="conversation-image-box">
            <img 
                className="conversation-image"
                src={returnImage()}
                alt="Mini profile"
            />
        </div>
        
        {/* Display name of last user who send  message and the beginning of the last message or default if none yet. */}
        <div className="conversation-text-box">

            <div className="conversation-title">
                
                {Adapters.capitalize(findConversationUser().username)}
            
                </div>

            { returnFirstLine()}

        </div>
        </Fragment>
    );
};

export default connect(mapStateToProps, null)(Conversation);