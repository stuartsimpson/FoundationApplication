const navigationActions = {
    navigate: (url) => {
        if(window.location.pathname === url.substr(0, url.indexOf('#'))){
            return({
                type: 'NAVIGATE_IN_MODULE',
                payload: url
            });
        } else {
            return({
                type: 'NAVIGATE_TO_MODULE',
                payload: url
            });
        }
    }
}

export navigationActions;
