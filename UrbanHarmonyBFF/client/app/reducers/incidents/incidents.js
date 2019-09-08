const incidents = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_INCIDENTS':
        //console.log(action);
        return action.incidents;
      default:
        return state;
    }
  };

  export default incidents