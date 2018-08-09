import {LOGIN, LOGOUT} from './types';

//Default App State - REDUX
const initialState = {
    username: "",
    userId: 0,
    loggedIn: false,
  }
  
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return { ...state,
                username: action.payload.username,
                userId: action.payload.userId,
                loggedIn: true
            }
        case LOGOUT:
            return { ...state,
                username: "",
                userId: 0,
                loggedIn: false
            }
        default:
            return state;
    }
}