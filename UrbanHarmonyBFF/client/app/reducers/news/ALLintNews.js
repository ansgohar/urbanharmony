const allinternalnews = (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_INTERNAL_NEWS':
            //console.log(action);
            return action.allinternalnews;

        default:
            return state;
    }
};

export default allinternalnews