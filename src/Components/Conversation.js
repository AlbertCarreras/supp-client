import React, { Fragment } from 'react';
import { connect } from 'react-redux';

//ADAPTERS
import Adapters from './../Adapters/Adapters';
import {API_SHORT_ROOT} from './../Adapters/AdapterConstants';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        userId: state.userId,
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
                : `/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
                }
                alt="Mini profile"
            />
        </div>
        <div className="conversation-text-box">

            <div className="conversation-title">
                {Adapters.capitalize(props.conversation.users.find((u) => u.id !== props.userId).username)}
            </div>
    
            <div className="conversation-first-message">
                {Adapters.capitalize(props.conversation.messages[(props.conversation.messages.length)-1].user.username)}: {props.conversation.messages[(props.conversation.messages.length)-1].text}
            </div> 

        </div>
        </Fragment>
    );
};

export default connect(mapStateToProps, null)(Conversation);