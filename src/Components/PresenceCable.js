import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';

// ACTIONS
import { updateClosestUsers } from '../actions'

//REDUX PROPS 
const mapStateToProps = state => {
  return {
    closestUsers: state.closestUsers,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateClosestUsers: (closestUsers) => dispatch(updateClosestUsers(closestUsers)),
  }
}

class PresenceCable extends Component {

  handleReceivedActiveUser = (response) => {
    const { type } = response    
    switch(type) {
      case "DC_USER":
        let closestUsers = [...this.props.closestUsers];
        let closestUser = closestUsers.find(
          closestUser => closestUser.userId === response.user
        );
        if (closestUser) {
          closestUser.active_user = false
          this.props.updateClosestUsers(closestUsers)
        }
        break;
      case "CO_USER":
        let closestUsers2 = [...this.props.closestUsers];
        let closestUser2 = closestUsers2.find(
          closestUser => closestUser.userId === response.user
        );
        if (closestUser2) {
          closestUser2.active_user = true
          this.props.updateClosestUsers(closestUsers2)
        }
        break;
      default:
        return null;
    }
      
  };

  render() {
    return (
            <ActionCable
                channel={{ 
                  channel: 'GlobalPresenceChannel'
                }}
                onReceived={(response) => this.handleReceivedActiveUser(response)}
            />
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PresenceCable);