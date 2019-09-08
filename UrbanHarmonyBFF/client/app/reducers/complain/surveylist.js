const surveyList = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_COMPLAINS_SURVEY_LIST':
        //console.log(action);
        return action.surveyList;
      default:
        return state;
    }
  };
  
  export default surveyList