import {
    SAVE_PROFILE,
    SAVE_PROFILE_IMAGE, 
    SAVE_CURRENT_GEOLOCATION
} from '../types';
  
import initialState from './state';
  
export default function userProfileReducer(state = initialState, action) {
    switch(action.type) {

        case SAVE_PROFILE:
            return { ...state,
                username: action.payload.username,
                bio: action.payload.bio,
            }
        case SAVE_PROFILE_IMAGE:
            return { ...state,
                profileImageLink: action.payload.profileImageLink,
            }
        case SAVE_CURRENT_GEOLOCATION:
            return { ...state,
                    lat: action.payload.lat,
                    lon: action.payload.lon,
                    prevGeolocationLat: action.payload.lat,
                    prevGeolocationLon: action.payload.lon,    
            }
  
        default:
            return state;
    }
}