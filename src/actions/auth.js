import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid, userPhoto, userName) => ({
    type: 'LOGIN',
    uid,
    userPhoto,
    userName
});

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};