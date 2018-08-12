import React from 'react';
import { withRouter} from 'react-router-dom';

import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

const ProfileSquare = (props) => {

    function usernameShortFormat(username) {
        return username.charAt(0).toUpperCase() + username.slice(1).split(" ")[0].substring(0, 9)
    }
    function usernameLongFormat(username) {
        return username.split(" ").map((a) => a.charAt(0).toUpperCase() + a.slice(1)).join(" ")
    }

    function profileSquareButton() {
        return (
            <div className="profile-image-space">
                <div className="profile-image-username animated flipInY">{
                    usernameShortFormat(props.username)
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
        <Modal dimmer={'inverted'} trigger={profileSquareButton()}>
        <Modal.Header>{usernameLongFormat(props.username)}</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>About me</Header>
            <p>{props.bio}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>Say <div className="footer-logo">Supp?!</div></Button>
        </Modal.Actions>
      </Modal>
    );
};

export default withRouter(ProfileSquare);