import React, { Component } from 'react';
import { connect } from 'react-redux';

//ADAPTERS
import Adapters from './../Adapters/Adapters';

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
                {/* USER PROFILE SQUARE */}
                <ProfileModal 
                    origin={"userListYou"}
                    username={"YOU"}
                    bio={this.props.bio}
                    profileImageLink={this.props.profileImageLink}
                />
                {/* CLOSEST USERS PROFILE SQUARES */}
                {this.generateUserList(this.props.closestUsers)}
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(UserList);