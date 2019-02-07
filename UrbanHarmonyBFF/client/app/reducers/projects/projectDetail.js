const projectDetail = (state = {}, action) => {
    switch (action.type) {
      case 'RETRIEVE_PROJECT_BY_ID':
        console.log(action);
        return action.projectDetail;
      default:
        return state;
    }
  };
  
  export default projectDetail