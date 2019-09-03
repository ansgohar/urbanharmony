

const image = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_IMAGE':
        console.log(action);
        return action.image;
      default:
        return state;
    }
  };

  export default image