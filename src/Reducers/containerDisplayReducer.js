import {
    DISPLAY_SCREEN_CONTAINER, 
} from '../types';
  
const initialState = {
    showChatContainer: false,
    showInterestsContainer: false
}

export default function userProfileReducer(state = initialState, action) {
    switch(action.type) {

        case DISPLAY_SCREEN_CONTAINER:
            return { ...state,
                showChatContainer: action.payload.showChatContainer,
                showInterestsContainer: action.payload.showInterestsContainer
            }
  
        default:
            return state;
    }
}