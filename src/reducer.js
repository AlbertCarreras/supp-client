import {
    JWT, LOGIN, LOGOUT, 
    SAVE_PROFILE, SAVE_PROFILE_IMAGE, 
    SAVE_CURRENT_GEOLOCATION, SAVE_CLOSEST_USERS,
    SAVE_USER_INTERESTS,
    SAVE_FILTERED_CLOSEST_USERS,
    SELECT_COMMON_INTERESTS, UNSELECT_COMMON_INTERESTS,
    SAVE_CONVERSATIONS, SAVE_SELECTED_CONVERSATION, APPEND_NEW_CONVERSATION,
} from './types';

//Default App State - REDUX
const initialState = {
    jwtToken: false,
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
    conversations: [],
    selectedConversationId: undefined,
  }
  
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case JWT: {
            return { ...state,
                jwtToken: true,
            }
        }
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
                userInterests: action.payload.userInterests,
                selectedCommonInterest: action.payload.selectedCommonInterest,
            }
        case LOGOUT:
            return { ...state,
                jwtToken: false,
                username: "",
                email: "",
                userId: null,
                loggedIn: false,
                bio: "",
                profileImageLink: undefined,
                lat: undefined,
                lon: undefined,
                prevGeolocationLat: undefined, 
                prevGeolocationLon: undefined,
                userInterests: [],
                closestUsers: [],
                selectedCommonInterest: undefined,
                conversations: [],
                selectedConversationId: undefined,            
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

        case SAVE_FILTERED_CLOSEST_USERS:
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

        case SAVE_USER_INTERESTS:
        return { ...state,
            userInterests: action.payload.userInterestArray,
        }

        case SAVE_CONVERSATIONS:
        return { ...state,
            conversations: action.payload.conversations,
        }

        case APPEND_NEW_CONVERSATION:
        return { ...state,
            conversations: [...state.conversations, action.payload.receivedNewConversation]
        }
        

        case SAVE_SELECTED_CONVERSATION:
        return { ...state,
            selectedConversationId: action.payload.selectedConversationId,
        }
  
        default:
            return state;
    }
}