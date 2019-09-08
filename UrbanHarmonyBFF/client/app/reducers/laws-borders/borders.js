const borders = (state = [], action) => {
    switch (action.type) {
        case 'RETRIEVE_BORDERS':
            //console.log(action);
            return action.borders;

        default:
            return state;
    }
};

export default borders