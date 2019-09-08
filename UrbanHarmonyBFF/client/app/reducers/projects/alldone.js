const alldone = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_ALL_DONE':
        //console.log(action);
        return action.alldone;
      default:
        return state;
    }
  };
  
  export default alldone