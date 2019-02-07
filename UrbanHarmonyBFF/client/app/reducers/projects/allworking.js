const allworking = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_ALL_WORKING':
        console.log(action);
        return action.allworking;
      default:
        return state;
    }
  };
  
  export default allworking