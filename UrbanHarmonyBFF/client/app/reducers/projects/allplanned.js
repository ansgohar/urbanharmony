const allplanned = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_ALL_PLANNED':
        console.log(action);
        return action.allplanned;
      default:
        return state;
    }
  };
  
  export default allplanned