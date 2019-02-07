const articles = (state = [], action) => {
  switch (action.type) {
    case 'RETRIEVE_ARTICLE':
      console.log(action);
      return action.articles;
    default:
      return state;
  }
};

export default articles