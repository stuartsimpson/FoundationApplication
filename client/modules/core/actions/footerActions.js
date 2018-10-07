function setFooterMessage(message){
    return {
        type: "FEEDBACK_POST_MESSAGE",
        payload: message
    };
}

export {setFooterMessage};
