import React, { Component, Fragment } from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

// ADAPTERS
import AdapterUser from './../Adapters/AdapterUser';
import Adapters from './../Adapters/Adapters';

// ACTIONS
import { saveProfile } from '../actions';
import { saveProfileImage } from '../actions';


// REDUX PROPS 

const mapStateToProps = state => {
    return {
        user_id: state.userId,
        username: state.username,
        bio: state.bio,
        profileImageLink: state.profileImageLink
    }
}

const mapDispatchToProps = dispatch => {
  return {
    saveProfile: (username, bio) => dispatch(saveProfile(username, bio)),
    saveProfileImage: (profileImageLink) => dispatch(saveProfileImage(profileImageLink))
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
        if (this.state.profile_image) {
            AdapterUser.uploadProfile(this.props.user_id, this.state.profile_image)
            .then(json => this.props.saveProfileImage(json.url))
        }
        
        if (this.state.username || this.state.bio) {
            AdapterUser.updateProfileInfo(this.props.user_id, this.state.username, this.state.bio)
            .then(json => this.props.saveProfile(json.username, json.bio))
        }

        this.props.history.push('/home');
    }

    render() {
        return (
            <Fragment>
                <div className="user-account-container">
                    <div className="ui form update-profile-form">
                        <div 
                            className="signup-message">YOUR PROFILE
                        </div>
                        <div className="fields">
                            <div className="field">
                                <label>Username</label>
                                <input 
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    onChange={this.handleChange}
                                    value={this.state.username}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="bio">About you</label>
                                <textarea
                                    name="bio"
                                    placeholder="Few words about yourself"
                                    onChange={this.handleChange}
                                    value={this.state.bio}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="profile_image"> Upload a profile photo </label>
                                <input
                                    type="file"
                                    name="profile_image"
                                    ref={this.fileInput}
                                    onChange={this.handleUpload}
                                />    
                            </div>
                        </div>          
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