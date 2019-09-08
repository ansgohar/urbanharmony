const globalsearch = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_GLOBAL_SEARCH':
        //console.log(action);
        return action.globalsearch;
      default:
        return state;
    }
  };

  export default globalsearch