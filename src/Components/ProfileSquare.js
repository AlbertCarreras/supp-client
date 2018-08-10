import React from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        username: state.username.charAt(0).toUpperCase() + state.username.slice(1),
        loggedIn: state.loggedIn,
        profileImageLink: state.profileImageLink,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
  }

const ProfileSquare = (props) => {
    return (
        <div>
            <p className="profile-image-username">{props.username}</p>
            <div className="profile-image-logged"></div>
            <img 
                className="profile-image-list animated flipInY delay-5s" 
                src={`${props.profileImageLink}`}
                alt="profile" 
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileSquare));