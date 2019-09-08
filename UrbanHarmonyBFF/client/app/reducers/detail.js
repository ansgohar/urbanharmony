const detail = (state = {}, action) => {
    switch (action.type) {
      case 'RETRIEVE_DETAIL':
        //console.log(action);
        return action.detail;
      default:
        return state;
    }
  };

  export default detail