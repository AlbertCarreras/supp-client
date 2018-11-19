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
    prevGeolocationLat: undefined,
    prevGeolocationLon: undefined,
    userInterests: [],
    closestUsers: [],
    selectedCommonInterest: undefined,
    conversations: [],
    selectedConversation: undefined,
    errorMessages: {},
}

export default initialState;