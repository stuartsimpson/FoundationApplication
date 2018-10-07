const defaultFeedback = {
    message: ''
};

var feedbackReducer = (state = defaultFeedback, action) => {
    switch(action.type){
        case 'FEEDBACK_POST_MESSAGE': {
            state = Object.assign({}, ...state, {message: action.payload});
            break;
        }
    }
    return(state);
};

export default feedbackReducer;
