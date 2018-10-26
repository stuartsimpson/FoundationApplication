const defaultFeedback = {
    message: ''
};

var feedbackReducer = (state = defaultFeedback, action) => {
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'FEEDBACK_POST_MESSAGE': {
            newState.message = action.payload;
            break;
        }
    }
    return(newState);
};

export default feedbackReducer;
