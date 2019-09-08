const competition = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_COMPETITION_OF_THE_MONTH':
        ////console.log(action);

        return action.competition;
  
      default:
        return state;
    }
  };
  
  export default competition