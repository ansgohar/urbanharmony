import { getComplainsList } from '../../actions/index.js'
import * as queryString from "query-string";
import { reset } from 'redux-form';
import * as jsonata from 'jsonata';

export default (async function modified_searchResults(values, dispatch){

    let url = '/advSearch/';

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    let filters = {status: "exists"};

    if (values.registrationNumber){
        filters['registrationNumber'] = values.registrationNumber;
    }
	if (values.address){
		filters['address_contains'] = values.address;
	}
	if (values.governorate){
		filters['governorate_contains'] = values.governorate;
	}
	if (values.mainArea){
		filters['mainArea_contains'] = values.mainArea;
	}
	if (values.subArea){
		filters['subArea_contains'] = values.subArea;
	}
    if (values.buildingName){
        filters['buildingName_contains'] = values.buildingName;
    }
    if (values.buildingNumber){
        filters['buildingNumber'] = values.buildingNumber;
    }

    let payload = {
      dir: 'surveylists',
      filters: filters,
      fields: ["_id", "address", "governorate", "mainArea", "subArea", "buildingName","registrationNumber","buildingType","buildingValue","buildingNumber", "status"]
    };

    options['body'] = JSON.stringify(payload);

    fetch(url, options)
      .then(res => {return res.json()})
      .then(body => {
        console.log(body)
        let expression = jsonata('data.$.surveylists.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":address, "governorate":governorate, "mainArea":mainArea, "subArea":subArea, "value":buildingValue,"status":status, "date":updatedAt,"buildingNo":buildingNumber,"buildingName":buildingName}');
        let surveyList = expression.evaluate(body);

        if (surveyList === undefined || Object.keys(surveyList).length == 0) {
            surveyList = [];
        }

        else if (Array.isArray(surveyList)) {
            surveyList = surveyList;
        }
        else {
            surveyList = [surveyList];
        }

        dispatch(getComplainsList(surveyList));
      });

      dispatch(reset('searchComplains'));
});

