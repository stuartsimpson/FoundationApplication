import stateStorage from 'Utils/stateStorage';

const defaultState = stateStorage.get('moduleState') || {};

var moduleReducer = (state = defaultState, action) => {
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'GET_MODULE_NAME': {
            newState.message = "//ToDO SetModuleName";
            stateStorage.set('moduleState', state);
            break;
        }
    }
    return(state);
};

export default moduleReducer;
