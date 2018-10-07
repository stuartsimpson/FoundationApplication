import stateStorage from '../../utils/stateStorage';

const defaultState = stateStorage.get('menuState') || {menu: {}, drawerOpen: false, drawerDocked: false};

var menuReducer = (state = defaultState, action) => {
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'SET_MENU_STATE':{
            newState.menu = action.payload.menu;
            state = newState;
            break;
        }
        case 'OPEN_MENU_DRAWER':{
            newState.drawerOpen = true;
            break;
        }
        case 'CLOSE_MENU_DRAWER':{
            newState.drawerOpen = false;
            break;
        }
        case 'DOCK_MENU_DRAWER':{
            newState.drawerDocked = true;
            break;
        }
        case 'UNDOCK_MENU_DRAWER':{
            newState.drawerDocked = false;
            break;
        }
    }
    return(newState);
};

export default menuReducer;
