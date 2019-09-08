const guidelines = (state = [], action) => {
    switch (action.type) {
        case 'RETRIEVE_GUIDELINES':
            //console.log(action);
            return action.guidelines;

        default:
            return state;
    }
};

export default guidelines