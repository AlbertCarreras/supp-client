import {
    SAVE_CONVERSATIONS, 
    SAVE_SELECTED_CONVERSATION,
    CLEAN_SELECTED_CONVERSATION,
    APPEND_NEW_CONVERSATION, 
} from '../types';
  
const initialState = {
    conversations: [],
    selectedConversation: undefined
}

export default function userConversationsReducer(state = initialState, action) {
    switch(action.type) {
        
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
            selectedConversation: action.payload.selectedConversation,
        }

        case CLEAN_SELECTED_CONVERSATION:
        return { ...state,
            selectedConversation: undefined,
        }

        default:
            return state;
    }
}