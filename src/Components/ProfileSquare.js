import React from 'react';
import { withRouter} from 'react-router-dom';
import { Header, Image, Modal } from 'semantic-ui-react'

// ADAPTERS
import Adapters from './../Adapters/Adapters';

//COMPONENTS
import UserInterestList from './UserInterestList'
import FriendInterestList from './FriendInterestList'
import StartChatButton from './StartChatButton'

const ProfileSquare = (props) => {

    function profileSquareButton() {
        return (
            <div className="profile-image-space">
                <div className="profile-image-username animated flipInY">{
                    Adapters.usernameShortFormat(props.username)
                }</div>
                <div className="profile-image-distance animated flipInY">{props.distance}</div>
                <div className="profile-image-logged animated flipInY"></div>
                <img 
                    className="profile-image-list animated flipInY" 
                    src={
                        props.profileImageLink !== "undefined"
                        ? `${props.profileImageLink}` 
                        : `/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
                    }
                    alt="profile" 
                />
            </div>
        )
    }
      
    return (
        <Modal dimmer={'inverted'} size={'small'} trigger={profileSquareButton()}>
        <Modal.Header>{Adapters.usernameLongFormat(props.username)}
        </Modal.Header>
        <Modal.Content image scrolling>
            <Image 
                size='medium' 
                src={
                props.profileImageLink !== "undefined"
                ? `${props.profileImageLink}` 
                : `/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
                } 
                wrapped 
            />
            <Modal.Description>
                <Header>About me</Header>
                <p>{props.bio}</p>
                <div className="ui tiny header">{props.distance}</div>
                {
                    props.username === "YOU"
                        ? <UserInterestList /> 
                        : <FriendInterestList friendInterestArray={props.interests}/>
                }
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            {
                props.username === "YOU" 
                ?   null
                :   <StartChatButton user_receiver_id={props.userId}/>
            }
            
        </Modal.Actions>
      </Modal>
    );
};

export default withRouter(ProfileSquare);