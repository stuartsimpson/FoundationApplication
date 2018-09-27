import axios from 'axios';
import cookies from '../../util/cookies';

//Actions
import {setFooterMessage} from './footerActions';
import {setUser, unsetUser} from './userActions';
import {navigate} from './navigationActions';

function authenticate(dispatch, credentials){
    axios.post('/services/public/user/authentication', credentials)
        .then( (res) => {
            if(res.data.user){
                dispatch(setFooterMessage('Authenticated'));
                dispatch(setUser({user:res.data.user}));
                dispatch(setAuthenticated({authenticated: true, token: res.data.token}));
                var destinationURL = cookies.get('destinationURL') || '/';
                destinationURL = decodeURIComponent(destinationURL);
                dispatch(navigate(destinationURL));
            } else {
                dispatch(setFooterMessage('Faild Authentication'));
            }
        })
        .catch((err) => {
            dispatch(setFooterMessage('Faild Authentication'));
        });
};

function cancelLogin(dispatch){
    dispatch(unsetAuthenticated());
    dispatch(unsetUser());
    cookies.delete('destinationURL');
    dispatch(navigate('/'));
}

function logout(dispatch){
    //ToDo: need to add axios call to clear user session from the server
    if(localStorage.getItem('authenticationState') || localStorage.getItem('userState')){
        dispatch(unsetAuthenticated());
        dispatch(unsetUser());
        cookies.delete('destinationURL');
        dispatch(navigate('/'));
        dispatch(setFooterMessage('Logged Out'));
    }
};

function login(dispatch, token){
    axios.get('/services/public/user/authentication/verify')
        .then((res) => {
            !res.data.valid ? dispatchLogin(dispatch) : dispatch(setFooterMessage('Authenticated'));
        })
        .catch((error) => {
            dispatchLogin(dispatch);
        });
};

function dispatchLogin(dispatch){
    dispatch(setFooterMessage('Enter Username/E-Mail and Password'));
    disptach(navigate('/#/authenticate'));
}

function setAuthenticated(val){
    return {
        type: "SET_AUTHENTICATED",
        payload: val
    };
}

function unsetAuthenticated(){
    return {
        type: "UNSET_AUTHENTICATED",
        payload: null
    };
}

function openAuthenticationDialog(){
    return {
        type: "OPEN_AUTHENTICATION_DIALOG",
        payload: null
    };
};

function closeAuthenticationDialog(){
    return {
        type: "CLOSE_AUTHENTICATION_DIALOG",
        payload: null
    };
};

export {authenticate, login, logout, cancelLogin}
