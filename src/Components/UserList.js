import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                    profileImageLink={user.profileImageLink}
                    distance={
                        user.distance < 1 
                            ? `${(user.distance * 5280).toFixed(1)} ft`
                            : `${(user.distance).toFixed(1)} mi`
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