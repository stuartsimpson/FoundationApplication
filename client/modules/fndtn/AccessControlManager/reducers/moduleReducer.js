import stateStorage from '../../../utils/stateStorage';

const defaultState = {
    selectedTab: 1,
    roles:[],
    roleResources:[],
    availableResources:[],
    roleMenus:[],
    availableMenus:[],
    roleRoles:[],
    availableRoles:[],
    resourceFilter:'',
    roleFilter:'',
    menuFilter:'',
    selectedRole:''
};

var templateReducer = (state = defaultState, action) => {
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'FNDTN_ACCESS_CONTROL_MANAGER_SAVE_ROLE_RESOURCE': {
            if(action.payload.index >= 0){
                newState.roleResources[action.payload.index]=action.payload.roleResource;
            }else{
                newState.roleResources.push(action.payload.roleResource);
            }
            break;
        }
        case 'FNDTN_ACCESS_CONTROL_MANAGER_SELECT_TAB': {
            newState.selectedTab = action.payload;
            break;
        }
        case 'FNDTN_ACCESS_CONTROL_MANAGER_SET_ROLES':{
            newState.roles = action.payload;
            break;
        }
        case 'FNDTN_ACCESS_CONTROL_MANAGER_SET_SELECTED_ROLE':{
            newState.selectedRole = action.payload.roleId;
            break;
        }
        case 'FNDTN_ACCESS_CONTROL_MANAGER_LOAD_ROLE_RESOURCES':{
            newState.roleResources = action.payload;
            break;
        }
        case 'FNDTN_ACCESS_CONTROL_MANAGER_TOGGLE_RESOURCE_RIGHT':{
            newState.roleResources[action.payload.index][action.payload.method] = !state.roleResources[action.payload.index][action.payload.method];
            break;
        }
        case 'FNDTN_ACCESS_CONTROL_MANAGER_LOAD_ROLE_MENUS':{
            newState.roleMenus = action.payload;
            break;
        }
        case 'FNDTN_ACCESS_CONTROL_MANAGER_LOAD_ROLE_ROLES':{
            newState.roleRoles = action.payload;
            break;
        }
        case 'FNDTN_ACCESS_CONTROL_MANAGER_SET_AVAILABLE_RESOURCES':{
            newState.availableResources = action.payload;
            break;
        }
        case 'FNDTN_ACCESS_CONTROL_MANAGER_SET_AVAILABLE_MENUS':{
            newState.availableMenus = action.payload;
            break;
        }
        case 'FNDTN_ACCESS_CONTROL_MANAGER_SET_AVAILABLE_ROLES':{
            newState.availableRoles = action.payload;
            break;
        }
    }
    return(newState);
};

export default templateReducer;
