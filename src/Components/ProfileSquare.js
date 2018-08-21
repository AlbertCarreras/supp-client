import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { Header, Image, Modal } from 'semantic-ui-react'

// ADAPTERS
import Adapters from './../Adapters/Adapters';

//COMPONENTS
import UserInterestList from './UserInterestList'
import FriendInterestList from './FriendInterestList'
import StartChatButton from './StartChatButton'

class ProfileSquare extends Component {

    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    profileSquareButton = () => {
        return (
            <div 
                className="profile-image-space"
                onClick={this.handleOpen}
            >
                <div className="profile-image-username animated flipInY">{
                    Adapters.usernameShortFormat(this.props.username)
                }</div>
                <div className="profile-image-distance animated flipInY">{this.props.distance}</div>
                <div className="profile-image-logged animated flipInY"></div>
                <img 
                    className="profile-image-list animated flipInY" 
                    src={ this.props.username === "YOU"
                            ? this.props.profileImageLink !== undefined
                                ? `${this.props.profileImageLink}` 
                                : `/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
                            : this.props.profileImageLink !== "undefined"
                                ? `${this.props.profileImageLink}` 
                                : `/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
                    }
                    alt="profile" 
                />
            </div>
        )
    }

    render = () => {

        return (
            <Modal 
                dimmer={'inverted'} 
                size={'small'} 
                trigger={this.profileSquareButton()}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
            <Modal.Header>{Adapters.usernameLongFormat(this.props.username)}
            </Modal.Header>
            <Modal.Content image scrolling>
                <Image 
                    size='medium' 
                    src={
                    this.props.profileImageLink !== undefined
                    ? `${this.props.profileImageLink}` 
                    : `/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
                    } 
                    wrapped 
                />
                <Modal.Description>
                    <Header>About me</Header>
                    <p>{this.props.bio}</p>
                    <div className="ui tiny header">{this.props.distance}</div>
                    {
                        this.props.username === "YOU"
                            ? <UserInterestList /> 
                            : <FriendInterestList friendInterestArray={this.props.interests}/>
                    }      
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                {
                    this.props.username === "YOU" 
                    ?   null
                    :   <StartChatButton 
                            user_receiver_id={this.props.userId}
                            onClickClose={this.handleClose}
                        />
                }
            </Modal.Actions>
    
        </Modal>
        );
    }
};

export default withRouter(ProfileSquare);