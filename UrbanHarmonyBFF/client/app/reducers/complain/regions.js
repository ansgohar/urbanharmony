const regions = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_REGIONS':
        console.log(action);
        return action.regions;
      default:
        return state;
    }
  };
  
  export default regions