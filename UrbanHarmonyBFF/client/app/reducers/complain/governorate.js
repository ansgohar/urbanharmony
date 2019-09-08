const governorates = (state = [], action) => {
    switch (action.type) {
      case 'RETRIEVE_GOVERNORATES':
        //console.log(action);
        return action.governorates;
      default:
        return state;
    }
  };
  
  export default governorates