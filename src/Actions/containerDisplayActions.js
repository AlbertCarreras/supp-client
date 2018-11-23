//TYPES
import {
    DISPLAY_SCREEN_CONTAINER, 
} from './../types';

//REDUX actions
export function displayScreenContainers(chat, interest) {
    return {
        type: DISPLAY_SCREEN_CONTAINER,
        payload: {
            showChatContainer: chat,
            showInterestsContainer: interest
        }
    }
}