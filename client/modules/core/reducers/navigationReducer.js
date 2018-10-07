import createHistory from 'history/createHashHistory';

const defaultHistory = {
    history: createHistory()
};

var historyReducer = (state = defaultHistory, action) => {
    switch(action.type){
        case 'NAVIGATE_IN_MODULE': {
            var location = action.payload.substring(action.payload.indexOf('#')+1);
            state.history.push(location);
            break;
        }
        case 'NAVIGATE_TO_MODULE': {
            window.location.href = action.payload;
            break;
        }
    }
    return(state);
};

export default historyReducer;
