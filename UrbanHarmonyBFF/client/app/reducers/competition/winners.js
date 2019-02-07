const winners = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_COMPETITION_WINNERS':
        console.log(action);

        return action.winners;
  
      default:
        return state;
    }
  };
  
  export default winners;