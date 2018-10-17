import axios from 'axios';
import cookies from 'Utils/cookies';

//Actions
import {setFooterMessage} from 'Core/actions/footerActions';
import {setUser, unsetUser} from 'Core/actions/userActions';
import {navigate} from 'Core/actions/navigationActions';

function authenticate(dispatch, credentials) {
    axios.post('/services/fndtn/users/authentication', credentials).then((res) => {
        if (res.data.user) {
            dispatch(setFooterMessage('Authenticated'));
            dispatch(setUser({user: res.data.user}));
            dispatch(setAuthenticated({authenticated: true, token: res.data.token}));
            var destinationURL = cookies.get('destinationURL') || '/';
            destinationURL = decodeURIComponent(destinationURL);
            dispatch(navigate(destinationURL));
        } else {
            dispatch(setFooterMessage('Faild Authentication'));
        }
    }).catch((err) => {
        dispatch(setFooterMessage('Faild Authentication'));
    });
};

function cancelLogin(dispatch) {
    dispatch(unsetAuthenticated());
    dispatch(unsetUser());
    cookies.delete('destinationURL');
    dispatch(navigate('/'));
};

function logout(dispatch) {
    //ToDo: need to add axios call to clear user session from the server
    if (localStorage.getItem('authenticationState') || localStorage.getItem('userState')) {
        dispatch(unsetAuthenticated());
        dispatch(unsetUser());
        cookies.delete('destinationURL');
        dispatch(navigate('/'));
        dispatch(setFooterMessage('Logged Out'));
    }
};

function login(dispatch, token) {
    axios.get('/services/fndtn/users/authentication/verify').then((res) => {
        if (!res.data.valid) {
            dispatch(setFooterMessage('Enter Username/E-Mail and Password'));
            disptach(navigate('modules/fndtn/Login'));
        } else {
            dispatch(setFooterMessage('Authenticated'));
        }
    }).catch((error) => {
        dispatchLogin(dispatch);
    });
};

function setAuthenticated(val) {
    return {type: "SET_AUTHENTICATED", payload: val};
};

function unsetAuthenticated() {
    return {type: "UNSET_AUTHENTICATED"};
};

function openAuthenticationDialog() {
    return {type: "OPEN_AUTHENTICATION_DIALOG"};
};

export { authenticate, cancelLogin, login, logout };
