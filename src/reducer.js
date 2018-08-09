import {LOGIN, LOGOUT} from './types';

//Default App State - REDUX
const initialState = {
    username: "",
    email: "",
    userId: 0,
    loggedIn: false,
  }
  
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return { ...state,
                username: action.payload.username,
                email: action.payload.email,
                userId: action.payload.userId,
                loggedIn: true
            }
        case LOGOUT:
            return { ...state,
                username: "",
                userId: null,
                loggedIn: false
            }
        default:
            return state;
    }
}