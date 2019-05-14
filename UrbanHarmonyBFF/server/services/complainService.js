const localConfig = require('../config/local.json')

const fetch = require("node-fetch");
const jsonata = require("jsonata");
const queryString = require('query-string');
const url = localConfig.CMS_URL || process.env.CMS_URL;
class ComplainService {

    getSurveyList(callback) {

        fetch(url + 'surveylist')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":fullAddress, "value":buildingValue,"status":status, "date":updatedAt, "region":region.regionName,"buildingNo":buildingNumber,"buildingName":buildingName}');
                let surveyList = expression.evaluate(myJson);
                callback(surveyList);
            });
    }


    getSearchResults(SearchQuery, callback) {
        fetch(url + 'surveylist?' + SearchQuery)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                let expression = jsonata('$.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":fullAddress, "value":buildingValue,"status":status, "date":updatedAt, "region":region.regionName,"buildingNo":buildingNumber,"buildingName":buildingName}');
                let surveyList = expression.evaluate(myJson);
                callback(surveyList);
            });
    }


    searhByAddressInSurveylist(searchAddress, callback) {
        // let queryAddress = encodeURIComponent(searchAddress);
        let bodyParam = { query: "query { surveylists (where: { fullAddress_contains:\"" + searchAddress + "\"}){fullAddress buildingName registrationNumber buildingType buildingValue buildingNumber}}" };
        fetch(url + 'graphql', {
            method: 'POST',
            body: JSON.stringify(bodyParam),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWFkYTJjYjE5MDUzMjQwMjc0ZjI0ZGMiLCJpYXQiOjE1NTYwNjE0NjMsImV4cCI6MTU1ODY1MzQ2M30.nCtF9ohmtyU1f-yEDZi7yD3QUNP26tLcAUqFPPK4wvU"
            }
        }).then(function (response) {
            return response.json();
        })
            .then(function (myJson) {
                let expression = jsonata('data.$.surveylists.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":fullAddress, "value":buildingValue,"status":status, "date":updatedAt,"buildingNo":buildingNumber,"buildingName":buildingName}');
                let surveyList = expression.evaluate(myJson);
                callback(surveyList);
            });

    }


    searchByAddressInComplainslist(addressQuery, callback) {
        // let queryAddress = encodeURIComponent(searchAddress);
        let bodyParam = { query: "query { surveylists (where: { fullAddress_contains:\"" + addressQuery + "\",  status_contains:\"exits\"}){fullAddress buildingName registrationNumber buildingType buildingValue buildingNumber}}" };
        fetch(url + 'graphql', {
            method: 'POST',
            body: JSON.stringify(bodyParam),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWFkYTJjYjE5MDUzMjQwMjc0ZjI0ZGMiLCJpYXQiOjE1NTYwNjE0NjMsImV4cCI6MTU1ODY1MzQ2M30.nCtF9ohmtyU1f-yEDZi7yD3QUNP26tLcAUqFPPK4wvU"
            }
        }).then(function (response) {
            return response.json();
        })
            .then(function (myJson) {
                // console.log(myJson);
                let expression = jsonata('data.$.surveylists.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":fullAddress, "value":buildingValue,"status":"Yes", "date":updatedAt,"buildingNo":buildingNumber,"buildingName":buildingName}');
                let cmplist = expression.evaluate(myJson);
                callback(cmplist);
            });

    }



    getComplainsSearchResults(Search, callback) {
        fetch(url + 'surveylist?status=exits&' + Search)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":fullAddress, "value":buildingValue,"status":status, "date":updatedAt, "region":region.regionName,"buildingNo":buildingNumber,"buildingName":buildingName}');
                let cmplist = expression.evaluate(myJson);
                callback(cmplist);
            });
    }


    getGovernorates(callback) {

        fetch(url + 'Governorate')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id, "name":governateName, "region":regions.regionName}');
                let governorates = expression.evaluate(myJson);
                callback(governorates);
            });
    }



    getAllComplainsList(callback) {
        // let query = encodeURIComponent('يوجد');
        fetch(url + 'surveylist?status=exists')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":fullAddress, "value":buildingValue,"status":status, "date":updatedAt, "region":region.regionName,"buildingNo":buildingNumber,"buildingName":buildingName}');
                let cmplist = expression.evaluate(myJson);
                callback(cmplist);
            });
    }



    getRegionsByGovernorate(id, callback) {

        fetch(url + 'regions?governorate._id=' + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id, "name":regionName}');
                let regions = expression.evaluate(myJson);
                callback(regions);
            });
    }
}

module.exports = function (app, serviceManager) {
    var complainservice = new ComplainService();
    serviceManager.set("complain-services", complainservice);
};