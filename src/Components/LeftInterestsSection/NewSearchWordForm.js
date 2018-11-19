import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

//ADAPTERS
import Adapters from './../../Adapters/Adapters';

// ACTIONS
import { thunkCreateNewWord } from '../../actions';

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      userId: state.userAuth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    thunkCreateNewWord: (userId, newTerm) => dispatch(thunkCreateNewWord(userId, newTerm)),
  }
}

const NewSearchWordForm = (props) => {

  return (
    <div 
      className="new-word-input"
      onClick={() => {
        props.thunkCreateNewWord(props.userId, Adapters.capitalize(props.searchTerm.toLowerCase()));
        props.cleanSearchTerm();
      }}
    >
      <p>New interest!</p> 
        <div className="new-word-btn">
          <Icon 
            color='teal' 
            name='add'
          />
          {Adapters.capitalize(props.searchTerm.toLowerCase())}
        </div>
    </div>
  )

};

export default connect(mapStateToProps, mapDispatchToProps)(NewSearchWordForm);