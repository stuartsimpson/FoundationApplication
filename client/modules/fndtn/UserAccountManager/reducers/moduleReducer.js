import stateStorage from '../../../utils/stateStorage';

const defaultState = {
    edit: false,
    index:-1,
    users:[],
    form:{
        _id:'',
        username:'',
        first:'',
        middle:'',
        last:'',
        email: '',
        phone: ''
    }
};

var templateReducer = (state = defaultState, action) => {
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'FNDTN_USER_ACCOUNT_MANAGER_SET_USERS': {
            newState.users = action.payload;
            break;
        }
    }
    return(newState);
};

export default templateReducer;
