const allCompetitions = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_ALL_COMPETITIONS':
        //console.log(action);

        return action.allCompetitions;
  
      default:
        return state;
    }
  };
  
  export default allCompetitions;