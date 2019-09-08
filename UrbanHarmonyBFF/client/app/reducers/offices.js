const offices = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_CONSULTING_OFFICES':
        //console.log(action);
        return action.offices;
      default:
        return state;
    }
  };

  export default offices