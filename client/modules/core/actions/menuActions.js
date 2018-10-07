function setMenuState() {
    return ({type: 'SET_MENU_STATE'})
};

function openMenuDrawer() {
    return ({type: 'OPEN_MENU_DRAWER'})
};

function closeMenuDrawer() {
    return ({type: 'CLOSE_MENU_DRAWER'})
};

function getUserMenu() {
    return ({type: 'LOAD_USER_MENUS'})
};

export {
    closeMenuDrawer,
    getUserMenu,
    openMenuDrawer,
    setMenuState
};
