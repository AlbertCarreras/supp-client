import {
    SAVE_CLOSEST_USERS, 
    UPDATE_ACTIVE_CLOSEST_USERS,
    SAVE_FILTERED_CLOSEST_USERS
} from '../types';
  
const initialState = {
    closestUsers: []
}

export default function userFriendsReducer(state = initialState, action) {
    switch(action.type) {
            
        case SAVE_CLOSEST_USERS:
            return { ...state,
                    closestUsers: action.payload.closestUsers,
        }    

        case SAVE_FILTERED_CLOSEST_USERS:
            return { ...state,
                    closestUsers: action.payload.closestUsers,
        }

        case UPDATE_ACTIVE_CLOSEST_USERS:
            return { ...state,
                    closestUsers: action.payload.closestUsers,
        } 

        default:
            return state;
    }
}