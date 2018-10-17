import stateStorage from 'Utils/stateStorage';

const defaultState = {
};

var moduleReducer = (state = defaultState, action) => {
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
    }
    return(newState);
};

export default moduleReducer;
