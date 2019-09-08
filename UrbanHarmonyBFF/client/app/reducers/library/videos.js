const videos = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_VIDEOS':
        //console.log(action);
        return action.videos;
      default:
        return state;
    }
  };

  export default videos