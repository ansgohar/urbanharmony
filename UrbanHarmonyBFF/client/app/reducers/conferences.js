const conferences = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_CONFERENCES':
        console.log(action);
        return action.conferences;
      default:
        return state;
    }
  };

  export default conferences