import {
    LOGIN, LOGOUT, 
    SAVE_PROFILE, SAVE_PROFILE_IMAGE, 
    SAVE_CURRENT_GEOLOCATION, SAVE_CLOSEST_USERS,
    ADD_USER_INTERESTS, REMOVE_USER_INTERESTS,
    SELECT_COMMON_INTERESTS, UNSELECT_COMMON_INTERESTS
} from './types';

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
    userInterests: [],
    closestUsers: [],
    selectedCommonInterest: undefined,
  }
  
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return { ...state,
                username: action.payload.username,
                email: action.payload.email,
                userId: action.payload.userId,
                bio: action.payload.bio,
                profileImageLink: action.payload.profileImageLink,
                prevGeolocationLat: action.payload.prevGeolocationLat, 
                prevGeolocationLon: action.payload.prevGeolocationLon,
                loggedIn: true,
                selectedCommonInterest: action.payload.selectedCommonInterest,
            }
        case LOGOUT:
            return { ...state,
                username: "",
                email: "",
                userId: null,
                loggedIn: false,
                bio: "",
                profileImageLink: undefined,
                lat: undefined,
                lon: undefined,
                userInterests: [],
                closestUsers: [],
                selectedCommonInterest: undefined,
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
        case SAVE_CURRENT_GEOLOCATION:
            return { ...state,
                    lat: action.payload.lat,
                    lon: action.payload.lon,
            }
        case SAVE_CLOSEST_USERS:
            return { ...state,
                    closestUsers: action.payload.closestUsers,
            }    

        case SELECT_COMMON_INTERESTS:
        return { ...state,
            selectedCommonInterest: action.payload.selectedCommonInterest,
        }
        
        case UNSELECT_COMMON_INTERESTS:
        return { ...state,
            selectedCommonInterest: undefined,
        }  

        case ADD_USER_INTERESTS:
        return { ...state,
            userInterests: [...state.userInterests, action.payload.selectedUserInterest]
        }

        case REMOVE_USER_INTERESTS:
        return { ...state,
            userInterests: [...state.userInterests.filter(interest => interest.id !== action.payload.selectedUserInterest.id)]
        }
  
        default:
            return state;
    }
}