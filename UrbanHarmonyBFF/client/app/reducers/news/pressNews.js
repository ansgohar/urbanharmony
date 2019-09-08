const pressNews = (state = [], action) => {
    switch (action.type) {
      case 'GET_PRESSNEWS':
        //console.log(action);
        return action.pressNews;
      default:
        return state;
    }
  };
  
  export default pressNews