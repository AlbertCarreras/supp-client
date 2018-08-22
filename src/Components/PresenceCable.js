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
    // const { user } = response
    

    switch(type) {
      case "DC_USER":
      console.log(response)
        // let closestUsers = [...this.props.closestUsers];
        // let closestUser = closestUsers.find(
        //   closestUser => closestUser.id === user
        // );
        // closestUser.active_user = false
        // this.props.updateClosestUsers(closestUsers)
        break;
      case "CO_USER":
      console.log(response)
        // let closestUsers2 = [...this.props.closestUsers];
        // let closestUser2 = closestUsers2.find(
        //   closestUser => closestUser.id === user
        // );
        // closestUser2.active_user = true
        // this.props.updateClosestUsers(closestUsers2)
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