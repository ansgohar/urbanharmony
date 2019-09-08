const planned = (state = [], action) => {
  switch (action.type) {
    case 'RETRIEVE_PLANNED':
      //console.log(action);
      return action.planned;
    default:
      return state;
  }
};

export default planned