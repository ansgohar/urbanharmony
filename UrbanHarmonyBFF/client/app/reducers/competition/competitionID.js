const competitionID = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_COMPETITION_BY_ID':
        //console.log(action);

        return action.competitionID;
  
      default:
        return state;
    }
  };
  
  export default competitionID;