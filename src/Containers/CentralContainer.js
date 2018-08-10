import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENTS
import ProfileSquare from "./../Components/ProfileSquare"

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        username: state.username,
        loggedIn: state.loggedIn,
        profileImageLink: state.profileImageLink,
        closestUsers: state.closestUsers,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
  }

class CentralContainer extends Component {

    generateUserList = (closestUsers) => {
        return(
            closestUsers.map(
                (user) => 
                <ProfileSquare 
                    key={user.userId}
                    username={user.username}
                    profileImageLink={user.profileImageLink}
                />
            )
        )
    }

    render() {
        return (
            <div className="central-container">
                <ProfileSquare 
                    username={"YOU"}
                    profileImageLink={this.props.profileImageLink}
                />
                {this.generateUserList(this.props.closestUsers)}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CentralContainer);