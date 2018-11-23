import { combineReducers } from "redux";

//REDUCERS
import userAuth from "./userAuthReducer";
import userProfile from "./userProfileReducer";
import userInterests from "./userInterestsReducer";
import userFriends from "./userFriendsReducer";
import userConversations from "./userConversationsReducer";
import containerDisplay from "./containerDisplayReducer";

const combinedReducers = combineReducers({
    userAuth,
    userProfile,
    userInterests,
    userFriends,
    userConversations,
    containerDisplay
});

const reducer = (state, action) => {
    // LOGOUT action sends undefined state, which will make each reducer return their initial state on the default action.
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return combinedReducers(state, action);
}

export default reducer;
  
  