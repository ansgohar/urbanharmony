const oneproject = (state = [], action) => {
    switch (action.type) {
      case 'GET_PROJECT':
        console.log(action);
        return action.oneproject;
      default:
        return state;
    }
  };
  
  export default oneproject