import stateStorage from '../../util/stateStorage';

const defaultState = stateStorage.get('authenticationState') || {authenticated: false, open: true, drawerOpen: false};

var authenticationReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_AUTHENTICATED':{
            state = Object.assign({}, ...state, {authenticated: action.payload.authenticated, token: action.payload.token});
            document.cookie = "authenticationToken="+action.payload.token+"; path=\/";
            stateStorage.set('authenticationState', state);
            break;
        }
        case 'UNSET_AUTHENTICATED':{
            state = Object.assign({}, ...state, {authenticated: false, token: undefined, drawerOpen: false});
            document.cookie = "authenticationToken=; path=\/";
            stateStorage.remove('authenticationState');
            break;
        }
        case 'OPEN_AUTHENTICATION':{
            state = Object.assign({}, ...state, {open: true});
            break;
        }
        case 'CLOSE_AUTHENTICATION':{
            state = Object.assign({}, ...state, {open: true});
            break;
        }
    }
    return(state);
};

export default authenticationReducer;
