import stateStorage from '../../../utils/stateStorage';

const defaultState = {
    edit: false,
    index:-1,
    roles:[],
    form:{
        _id:'',
        file:'',
        url:'',
        static:false,
        public:false,
        protected: false
    }
};

var moduleReducer = (state = defaultState, action) => {
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'MODULE_SET': {
            stateStorage.set('moduleState', state);
            break;
        }
        case 'FNDTN_ROLE_MANAGER_CLEAR_FORM':{
            newState.form = {
                _id:'',
                file:'',
                url:'',
                static:false,
                public:false,
                protected: false
            };
            newState.index = -1;
            break;
        }
        case 'FNDTN_ROLE_MANAGER_SET_ROLES': {
            newState.roles = action.payload;
            break;
        }
        case 'FNDTN_ROLE_MANAGER_SET_FORM_VALUE':{
            newState.form[action.payload.field] = action.payload.value;
            break;
        }
        case 'FNDTN_ROLE_MANAGER_EDIT_ROLE':{
            newState.form = action.payload.role;
            newState.index = action.payload.index;
            newState.edit = true;
            break;
        }
        case 'FNDTN_ROLE_MANAGER_CANCEL_EDIT':{
            newState.edit = false;
            break;
        }
        case 'FNDTN_ROLE_MANAGER_SAVE_ROLE':{
            if(action.payload.index >= 0){
                newState.roles[action.payload.index] = action.payload.role;
            } else {
                newState.roles.push(action.payload.role);
            }
            break;
        }
        case 'FNDTN_ROLE_MANAGER_DELETE_ROLE':{
            var roles = newState.roles.slice();
            roles.splice(action.payload.index, 1);
            newState.roles = roles;
            break;
        }
    }
    return(newState);
};

export default moduleReducer;
