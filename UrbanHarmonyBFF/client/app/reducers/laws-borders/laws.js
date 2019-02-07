const laws = (state = [], action) => {
    switch (action.type) {
        case 'RETRIEVE_LAWS':
            console.log(action);
            return action.laws;

        default:
            return state;
    }
};

export default laws