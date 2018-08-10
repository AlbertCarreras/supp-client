import {LOGIN, LOGOUT, SAVE_PROFILE, SAVE_PROFILE_IMAGE, GET_CURRENT_GEOLOCATION} from './types';

//Default App State - REDUX
const initialState = {
    username: "",
    email: "",
    userId: null,
    loggedIn: false,
    bio: "",
    profileImageLink: undefined,
    lat: undefined,
    lon: undefined,
  }
  
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return { ...state,
                username: action.payload.username,
                email: action.payload.email,
                userId: action.payload.userId,
                profileImageLink: action.payload.profileImageLink,
                prevGeolocationLat: action.payload.prevGeolocationLat, 
                prevGeolocationLon: action.payload.prevGeolocationLon,
                loggedIn: true
            }
        case LOGOUT:
            return { ...state,
                username: "",
                email: "",
                userId: null,
                profileImageLink: "",
                loggedIn: false
            }
        case SAVE_PROFILE:
            return { ...state,
                username: action.payload.username,
                bio: action.payload.bio,
            }
        case SAVE_PROFILE_IMAGE:
            return { ...state,
                profileImageLink: action.payload.profileImageLink,
            }
        case GET_CURRENT_GEOLOCATION:
        return { ...state,
                lat: action.payload.lat,
                lon: action.payload.lon,
            }       
        default:
            return state;
    }
}