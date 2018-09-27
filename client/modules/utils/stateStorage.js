const stateStorage = {
    'get':(stateName) => {
        return JSON.parse(localStorage.getItem(stateName)) || undefined;
    },
    'set':(stateName, state) => {
        localStorage.setItem(stateName, JSON.stringify(state));
    },
    'remove': (stateStorage) => {
        localStorage.removeItem(stateName);
    }
};

export default stateStorage;
