const complainsList = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_COMPLAINS_LIST':
        console.log(action);
        return action.complainsList;
      default:
        return state;
    }
  };
  
  export default complainsList