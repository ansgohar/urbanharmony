const incidentDetails = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_INCIDENT_DETAILS':
        console.log(action);
        return action.incidentDetails;
      default:
        return state;
    }
  };

  export default incidentDetails