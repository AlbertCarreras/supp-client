import { combineReducers } from "redux";

//REDUCERS
import userAuth from "./userAuthReducer";
import userProfile from "./userProfileReducer";
import userInterests from "./userInterestsReducer";
import userFriends from "./userFriendsReducer";
import userConversations from "./userConversationsReducer";

export default combineReducers({
    userAuth,
    userProfile,
    userInterests,
    userFriends,
    userConversations
});