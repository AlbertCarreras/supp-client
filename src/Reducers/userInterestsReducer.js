import {
    LOGIN,
    SAVE_USER_INTERESTS,
    SELECT_COMMON_INTERESTS, 
    UNSELECT_COMMON_INTERESTS
} from '../types';
  
const initialState = {
    userInterests: [],
    selectedCommonInterest: undefined
}  

export default function userInterestsReducer(state = initialState, action) {
    switch(action.type) {

        case LOGIN:
        return { ...state,
            userInterests: action.payload.userInterests,
            selectedCommonInterest: action.payload.selectedCommonInterest,
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
  
        default:
            return state;
    }
}