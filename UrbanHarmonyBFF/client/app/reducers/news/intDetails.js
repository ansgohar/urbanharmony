const internalDetail = (state = {}, action) => {
    switch (action.type) {
        case 'GET_INTERNAL_BY_ID':
            //console.log(action);
            return action.internalDetail;

        default:
            return state;
    }
};

export default internalDetail