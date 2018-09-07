import React, { Fragment } from 'react';
import { connect } from 'react-redux';

//ADAPTERS
import Adapters from './../../Adapters/Adapters';
import {API_SHORT_ROOT} from './../../Adapters/AdapterConstants';
import {GITHUB_URL_ROOT} from './../../Adapters/AdapterConstants';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        userId: state.userId,
        conversations: state.conversations,
    }
}


const Conversation = (props) => {
    return (
        <Fragment>
        <div className="conversation-image-box">
            <img 
                className="conversation-image"
                src={
                    props.conversation.users.find((u) => u.id !== props.userId).profile_image_url !== "undefined"
                ? `${API_SHORT_ROOT+props.conversation.users.find((u) => u.id !== props.userId).profile_image_url}` 
                : GITHUB_URL_ROOT+`/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
                }
                alt="Mini profile"
            />
        </div>
        <div className="conversation-text-box">

            <div className="conversation-title">
                {Adapters.capitalize(props.conversation.users.find((u) => u.id !== props.userId).username)}
            </div>
            { props.conversation.messages.length === 0
                ?   <div className="conversation-first-message">
                        <p>Start a conversation!</p>
                    </div> 
                :   <div className="conversation-first-message">
                        {Adapters.capitalize(props.conversation.messages[(props.conversation.messages.length)-1].user.username)}: {`${props.conversation.messages[(props.conversation.messages.length)-1].text.substring(0, 15)}...`}
                    </div> 
            }
            

        </div>
        </Fragment>
    );
};

export default connect(mapStateToProps, null)(Conversation);