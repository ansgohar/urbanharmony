const news = (state = [], action) => {
    switch (action.type) {
      case 'GET_NEWS':
        console.log(action);
        return action.news;
      default:
        return state;
    }
  };
  
  export default news