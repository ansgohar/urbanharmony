const books = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_LIBRARY_BOOKS':
        //console.log(action);
        return action.books;
      default:
        return state;
    }
  };

  export default books