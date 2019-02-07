const done = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_DONE':
        console.log(action);
        return action.done;
  
      default:
        return state;
    }
  };
  
  export default done