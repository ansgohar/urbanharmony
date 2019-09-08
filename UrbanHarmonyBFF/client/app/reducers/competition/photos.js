const photos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_IMAGE_TO_THE_LIST':
        ////console.log(action);

        return action.photos;
  
      default:
        return state;
    }
  };
  
  export default photos