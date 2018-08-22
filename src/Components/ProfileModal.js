import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { Header, Image, Modal } from 'semantic-ui-react'

// ADAPTERS
import Adapters from './../Adapters/Adapters';

//COMPONENTS
import UserInterestList from './UserInterestList'
import FriendInterestList from './FriendInterestList'
import StartChatButton from './StartChatButton'
import ProfileSquare from './ProfileSquare'

class ProfileModal extends Component {
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    selectTrigger = () => {
        if (this.props.origin === "userList") {
            return <ProfileSquare 
                        user={this.props}
                        handleOpen={this.handleOpen}
                    />
        }
        if (this.props.origin === "chatHeader") {
            return  <img 
                        className="chat-header-image"
                        onClick={this.handleOpen}
                        src={
                            this.props.profileImageLink !== "undefined"
                            ?  Adapters.getStandardImageUrl(this.props.profileImageLink)
                            : `/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
                        }
                        alt="Mini profile"
                    />
        }
    }

    render = () => {
        return (
            <Modal 
                dimmer={'inverted'} 
                size={'small'} 
                trigger={ this.selectTrigger() }
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
                    ? Adapters.getStandardImageUrl(this.props.profileImageLink) 
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
                            ? <UserInterestList 
                                onClickClose={this.handleClose}
                            /> 
                            : <FriendInterestList 
                                friendInterestArray={this.props.interests}
                                onClickClose={this.handleClose}
                            />
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

export default withRouter(ProfileModal);