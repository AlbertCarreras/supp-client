import {LOGIN, LOGOUT} from './types';

//Default App State - REDUX
const initialState = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
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
                userId: null,
                loggedIn: false
            }
        default:
            return state;
    }
}