import React, { Component, Fragment } from 'react';
import { withRouter, NavLink} from 'react-router-dom';
import { Header, Image, Modal } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'

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
        if (this.props.origin === "userListYou") {
            return <ProfileSquare 
                        user={this.props}
                        handleOpen={this.handleOpen}
                    />
        }
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

    displayDistance = () => {
        if (this.props.username !== "YOU") {
            return ( <div className="ui tiny header">
                        <Icon 
                            color='teal' 
                            name='map marker alternate' 
                        />
                        {this.props.distance} from you.
                        </div>
            )
        }
    }
    displayBio = () => {
        if (this.props.bio) {
            return <p>{this.props.bio}</p>
        }
        else {

            if (this.props.username === "YOU") {
                return (
                    <Fragment>
                        <p>You have not written anything yet.</p>
                        <Icon 
                            color='teal' 
                            name='pencil alternate icon' 
                        />
                        <NavLink to="/user/profile" exact>Edit Your Profile</NavLink>
                    </Fragment>

                )
            }
            else {
                return <p>{Adapters.usernameLongFormat(this.props.username)} has not written anything yet.</p>
            }
        }
    }

    render = () => {
        return (
            <Modal 
                dimmer={'inverted'} 
                size={'tiny'} 
                trigger={ this.selectTrigger() }
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
            <Modal.Header>{Adapters.usernameLongFormat(this.props.username)}
            </Modal.Header>
            <Modal.Content image>
                <Image 
                    size='medium'
                    wrapped
                    src={
                    this.props.profileImageLink !== undefined
                    ? Adapters.getStandardImageUrl(this.props.profileImageLink) 
                    : `/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
                    } 
                />
                <Modal.Description>
                    <Header>About me</Header>
                    {  this.displayBio() }  
                    {  this.displayDistance() }      
                    <Header>Interests</Header>
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