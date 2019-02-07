const working = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_WORKING':
        console.log(action);
        return action.working;
  
      default:
        return state;
    }
  };
  
  export default working