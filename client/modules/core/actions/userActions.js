const userActions = {
    setUser: (user) => {
        return {
            type: "SET_USER",
            payload: user
        };
    },
    unsetUser: () => {
        return {
            type: "UNSET_USER"
        };
    }
}

export userActions;
