import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';

// ADAPTERS
import Adapters from './../Adapters/Adapters';

class ProfileSquare extends Component {

    render = () => {
        return (
            <div 
                className="profile-image-space"
                onClick={this.props.handleOpen}
            >
                <div className="profile-image-username animated flipInY">{
                    Adapters.usernameShortFormat(this.props.user.username)
                }</div>
                <div className="profile-image-distance animated flipInY">{this.props.user.distance}</div>
                <div className="profile-image-logged animated flipInY"></div>
                <img 
                    className="profile-image-list animated flipInY" 
                    src={ this.props.user.username === "YOU"
                            ? this.props.user.profileImageLink !== undefined
                                ? `${this.props.user.profileImageLink}` 
                                : `/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
                            : this.props.user.profileImageLink !== "undefined"
                                ? `${this.props.user.profileImageLink}` 
                                : `/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
                    }
                    alt="profile" 
                />
            </div>
        );
    }
};

export default withRouter(ProfileSquare);