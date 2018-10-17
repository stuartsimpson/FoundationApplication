import stateStorage from 'Utils/stateStorage';

const defaultState = {
    edit: false,
    index:-1,
    menus:[],
    form:{
        _id:'',
        display:'',
        menuType:'',
        resourceURL:''
    }
};

var moduleReducer = (state = defaultState, action) => {
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'MODULE_SET': {
            stateStorage.set('moduleState', state);
            break;
        }
        case 'FNDTN_MENU_MANAGER_CLEAR_FORM':{
            newState.form = {
                _id:'',
                display:'',
                menuType:'',
                resourceURL:''
            };
            newState.index = -1;
            break;
        }
        case 'FNDTN_MENU_MANAGER_SET_MENUS': {
            newState.menus = action.payload;
            break;
        }
        case 'FNDTN_MENU_MANAGER_SET_FORM_VALUE':{
            newState.form[action.payload.field] = action.payload.value;
            break;
        }
        case 'FNDTN_MENU_MANAGER_EDIT_MENU':{
            newState.form = action.payload.menu;
            newState.index = action.payload.index;
            newState.edit = true;
            break;
        }
        case 'FNDTN_MENU_MANAGER_CANCEL_EDIT':{
            newState.edit = false;
            break;
        }
        case 'FNDTN_MENU_MANAGER_SAVE_MENU':{
            if(action.payload.index >= 0){
                newState.menus[action.payload.index] = action.payload.menu;
            } else {
                newState.menus.push(action.payload.menu);
            }
            break;
        }
        case 'FNDTN_MENU_MANAGER_DELETE_MENU':{
            var menus = newState.menus.slice();
            menus.splice(action.payload.index, 1);
            newState.menus = menus;
            break;
        }
    }
    return(newState);
};

export default moduleReducer;
