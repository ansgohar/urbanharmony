const localConfig = require('../config/local.json')

const fetch = require("node-fetch");
const jsonata = require("jsonata");
const queryString = require('query-string');
const url = localConfig.CMS_URL || process.env.CMS_URL;

const auth = require('../services/service-manager').get('auth-service');

class ComplainService {

    getSurveyList(callback) {
        auth.getAuthToken(function (token) {
            fetch(url + 'surveylist', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    let expression = jsonata('$.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":fullAddress, "value":buildingValue,"status":status, "date":updatedAt, "region":region.regionName,"buildingNo":buildingNumber,"buildingName":buildingName}');
                    let surveyList = expression.evaluate(myJson);
                    callback(surveyList);
                });
        });
    }


    getSearchResults(SearchQuery, callback) {
        auth.getAuthToken(function (token) {
            fetch(url + 'surveylist?' + SearchQuery, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    //console.log(myJson);
                    let expression = jsonata('$.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":fullAddress, "value":buildingValue,"status":status, "date":updatedAt, "region":region.regionName,"buildingNo":buildingNumber,"buildingName":buildingName}');
                    let surveyList = expression.evaluate(myJson);
                    callback(surveyList);
                });
        });
    }

    searhByAddressInSurveylist(searchAddress, callback) { // TODO: Update with auth
        // let queryAddress = encodeURIComponent(searchAddress);
        auth.getAuthToken(function (token) {
            let bodyParam = {
                query: "query { surveylists (where: { fullAddress_contains:\"" + searchAddress + "\"}){fullAddress buildingName registrationNumber buildingType buildingValue buildingNumber status}}"
            };
            fetch(url + 'graphql', {
                    method: 'POST',
                    body: JSON.stringify(bodyParam),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }).then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    let expression = jsonata('data.$.surveylists.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":fullAddress, "value":buildingValue,"status":status, "date":updatedAt,"buildingNo":buildingNumber,"buildingName":buildingName}');
                    let surveyList = expression.evaluate(myJson);
                    callback(surveyList);
                });

        })
    }


    searchByAddressInComplainslist(addressQuery, callback) { // TODO: update with auth
        // let queryAddress = encodeURIComponent(searchAddress);
        auth.getAuthToken(function (token) {
            let bodyParam = {
                query: "query { surveylists (where: { fullAddress_contains:\"" + addressQuery + "\",  status_contains:\"exists\"}){fullAddress buildingName registrationNumber buildingType buildingValue buildingNumber status}}"
            };
            fetch(url + 'graphql', {
                    method: 'POST',
                    body: JSON.stringify(bodyParam),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }).then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    // //console.log(myJson);
                    let expression = jsonata('data.$.surveylists.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":fullAddress, "value":buildingValue,"status":status, "date":updatedAt,"buildingNo":buildingNumber,"buildingName":buildingName}');
                    let cmplist = expression.evaluate(myJson);
                    callback(cmplist);
                });
        })
    }



    getComplainsSearchResults(Search, callback) {
        auth.getAuthToken(function (token) {

            fetch(url + 'surveylist?status=exists&' + Search, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    let expression = jsonata('$.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":fullAddress, "value":buildingValue,"status":status, "date":updatedAt, "region":region.regionName,"buildingNo":buildingNumber,"buildingName":buildingName}');
                    let cmplist = expression.evaluate(myJson);
                    callback(cmplist);
                });
        });
    }


    getGovernorates(callback) {
        auth.getAuthToken(function (token) {

            fetch(url + 'Governorate', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    let expression = jsonata('$.{"id":_id, "name":governateName, "region":regions.regionName}');
                    let governorates = expression.evaluate(myJson);
                    callback(governorates);
                });
        });
    }



    getAllComplainsList(callback) {
        // let query = encodeURIComponent('يوجد');
        auth.getAuthToken(function (token) {

            fetch(url + 'surveylist?status=exists', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    let expression = jsonata('$.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":fullAddress, "value":buildingValue,"status":status, "date":updatedAt, "region":region.regionName,"buildingNo":buildingNumber,"buildingName":buildingName}');
                    let cmplist = expression.evaluate(myJson);
                    callback(cmplist);
                });
        });
    }

    getAllPetitions(callback) {
        auth.getAuthToken(function (token) {

            fetch(url + 'petiton', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    // let expression = jsonata('$.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":fullAddress, "value":buildingValue,"status":status, "date":updatedAt, "region":region.regionName,"buildingNo":buildingNumber,"buildingName":buildingName}');
                    // let cmplist = expression.evaluate(myJson);
                    callback(myJson);
                });

        });
    }




    getRegionsByGovernorate(id, callback) {
        auth.getAuthToken(function (token) {

            fetch(url + 'regions?governorate._id=' + id, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    let expression = jsonata('$.{"id":_id, "name":regionName}');
                    let regions = expression.evaluate(myJson);
                    callback(regions);
                });
        });

    }
}

module.exports = function (app, serviceManager) {
    var complainservice = new ComplainService();
    serviceManager.set("complain-services", complainservice);
};