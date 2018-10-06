import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react'

//ADAPTERS
import Adapters from './../../Adapters/Adapters';

//COMPONENTS
import ProfileModal from "./ProfileModal"

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        username: state.username,
        bio: state.bio,
        loggedIn: state.loggedIn,
        profileImageLink: state.profileImageLink,
        closestUsers: state.closestUsers,
    }
}

class UserList extends Component {

    // Get array with the returned closest users, map over it so for each one it's displayed a profile modal component. The origin is userList so the modal can display squared profile images.
    generateUserList = (closestUsers) => {
        return(
            closestUsers.map(
                (user) => 
                <ProfileModal 
                    key={user.userId}
                    origin={"userList"}
                    bio={user.bio}
                    userId={user.userId}
                    username={user.username}
                    interests={user.interests}
                    active_user={user.active_user}
                    profileImageLink={user.profileImageLink}
                    distance={
                        Adapters.getReadableDistance(user.distance)
                    }
                />
            )
        )
    }

    render() {
        
        return (
            <div className="central-container">
                {/* USER PROFILE SQUARE >> First square in the list.*/}
                <ProfileModal 
                    origin={"userListYou"}
                    username={"YOU"}
                    active_user={true}
                    bio={this.props.bio}
                    profileImageLink={this.props.profileImageLink}
                />
                {/* CLOSEST USERS PROFILE SQUARES */}
                {this.props.closestUsers.length !== 0
                    ? this.generateUserList(this.props.closestUsers) 
                    :   <div>
                          <Loader active />
                          <p className="loading-message"> Finding you location and people around you... </p>
                        </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(UserList);