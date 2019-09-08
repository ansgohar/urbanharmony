const officeDetails = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_CONSULTING_OFFICE_DETAILS':
        //console.log(action);
        return action.officeDetails;
      default:
        return state;
    }
  };

  export default officeDetails