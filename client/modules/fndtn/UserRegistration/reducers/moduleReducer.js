import stateStorage from '../../../utils/stateStorage';

const defaultState = stateStorage.get('moduleState') || {
    errorText: {
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
        emailConfirm: ''
    },
    form: {
        captcha: '',
        first: '',
        middle: '',
        last: '',
        username: '',
        email: '',
        emailConfirm:'',
        password:'',
        passwordConfirm:'',
        phone:''
    }
};

var moduleReducer = (state = defaultState, action) => {
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'FNDTN_REGISTRATION_STATE_SET': {
            stateStorage.set('moduleState', newState);
            break;
        }
        case 'FNDTN_REGISTRATION_SET_FIELD_VALUE':{
            newState.form[action.payload.attribute] = action.payload.value;
            state = newState;
            break;
        }
        case 'FNDTN_REGISTRATION_SET_FIELD_ERROR_TEXT':{
            newState.errorText[action.payload.attribute] = action.payload.value;
            state = newState;
            break;
        }
    }
    return(state);
};

export default moduleReducer;
