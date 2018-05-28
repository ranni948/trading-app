import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetItems } from './actions/items';
import { login, logout } from './actions/auth';
import { NavLink } from 'react-router-dom';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import "react-image-gallery/styles/css/image-gallery.css";
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage'

const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let userPhoto = user.photoURL;
        let userName = user.displayName;
        store.dispatch(login(user.uid, userPhoto, userName));
        store.dispatch(startSetItems()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});