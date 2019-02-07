const internalnews = (state = [], action) => {
    switch (action.type) {
        case 'GET_INTERNALNEWS':
            console.log(action);
            return action.internalnews;

        default:
            return state;
    }
};

export default internalnews