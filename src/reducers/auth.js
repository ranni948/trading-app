export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid,
                userPhoto: action.userPhoto,
                userName: action.userName
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};