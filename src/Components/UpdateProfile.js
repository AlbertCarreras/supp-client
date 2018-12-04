import React, { Component, Fragment } from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

// ADAPTERS
import Adapters from './../Adapters/Adapters';
import {config} from './../Adapters/AdapterConstants'

// ACTIONS
import { thunkUpdateProfileInfo, thunkUploadProfile } from './../Actions/userProfileActions';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        user_id: state.userAuth.userId,
        username: state.userProfile.username,
        bio: state.userProfile.bio,
        profileImageLink: state.userProfile.profileImageLink
    }
}

const mapDispatchToProps = dispatch => {
  return {
    thunkUploadProfile: (userId, profileImage) => dispatch(thunkUploadProfile(userId, profileImage)),
    thunkUpdateProfileInfo: (userId, username, bio) => dispatch(thunkUpdateProfileInfo(userId, username, bio)),
  }
}

class UpdateProfile extends Component {

    // keeping local state
    state = {
        username: Adapters.capitalize(this.props.username),
        bio: this.props.bio,
        profile_image: undefined
    };

    //PROPS FUNCTIONALITY: Button handlers
    handleChange = (event) => {
        this.setState({
        [event.target.name]: event.target.value,
        })
    }

    handleUpload = (event) => {
        this.setState({
        [event.target.name]: event.target.files[0],
        })
    }


    handleSubmit = () => {
        //Check if there is a photo. If so, persisted.
        if (this.state.profile_image) {
            this.props.thunkUploadProfile(this.props.user_id, this.state.profile_image)
        }
        // Check if there is a username or bio. If so, persisted.

        if (this.state.username || this.state.bio) {
            this.props.thunkUpdateProfileInfo(this.props.user_id, this.state.username, this.state.bio)
        }

        this.props.history.push(config.route.URL_HOME);
    }

    render() {
        return (
            <Fragment>
                <div className="user-account-container">
                    <div className="update-profile-form ">

                        <div className="signup-message">YOUR PROFILE</div>

                        <br/>
                        
                        <h4>Username</h4>
                        <div className="ui input">
                            <br/>
                            <input 
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={this.handleChange}
                                value={this.state.username}
                            />
                        </div>
                        
                        <br/>
                        
                        <h4>About you</h4>
                        <div className="ui form">
                            <textarea
                                name="bio"
                                placeholder="Few words about yourself"
                                onChange={this.handleChange}
                                value={this.state.bio}
                            />
                        </div>
                        
                        <h4> Upload a profile photo </h4>
                        <input
                            type="file"
                            name="profile_image"
                            ref={this.fileInput}
                            onChange={this.handleUpload}
                        /> 
                        
                        <br/>   
                        
                        <div 
                            className="ui submit button"
                            onClick={this.handleSubmit}
                            >Save Profile
                        </div>
                        
                    </div>
                </div>
            </Fragment>

           
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateProfile));