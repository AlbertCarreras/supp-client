import React, { Component, Fragment } from 'react';
import { withRouter, NavLink} from 'react-router-dom';
import { Header, Image, Modal } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'

// ADAPTERS
import Adapters from './../../Adapters/Adapters';
import { URL_USER_PROFILE } from './../../Adapters/AdapterConstants'

//COMPONENTS
import UserInterestList from './UserInterestList'
import FriendInterestList from './FriendInterestList'
import StartChatButton from './StartChatButton'
import ProfileSquare from './ProfileSquare'

class ProfileModal extends Component {

    // Toggle true-false to close-open the modal. 
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    // Helper functions to build the modal
    // Check the component that is triggering the modal so the correct trigger-component can be selected (square profile image or round chat image).
    // NOTE: Case conditional statement should be used instead of if.
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
                        src={Adapters.getStandardImageUrl(this.props.profileImageLink)}
                        alt="Mini profile"
                    />
        }
    }

    displayDistance = () => {
        if (this.props.username !== "YOU") {
            if (!!this.props.distance){
            return ( <div className="ui tiny header">
                        <Icon 
                            color='teal' 
                            name='map marker alternate' 
                        />
                        {this.props.distance} from you.
                        </div>
            )}
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
                            name='pencil alternate' 
                        />
                        <NavLink to={URL_USER_PROFILE} exact>Edit Your Profile</NavLink>
                    </Fragment>

                )
            }
            else {
                return <p>{Adapters.usernameLongFormat(this.props.username)} has not written anything yet.</p>
            }
        }
    }

    render = () => {
        //Semantics React UI modal. It gets triggered (opened) with "selectTrigger" helper function.
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
                    src={Adapters.getStandardImageUrl(this.props.profileImageLink)} 
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