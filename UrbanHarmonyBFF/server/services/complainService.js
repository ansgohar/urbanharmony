const localConfig = require('../config/local.json')

const fetch = require("node-fetch");
const jsonata = require("jsonata");
const queryString = require('query-string');
const url = localConfig.CMS_URL || process.env.CMS_URL;

class ComplainService {

    getAuthToken(callback){
        const user = localConfig.USER || process.env.USER;
        const secert = localConfig.SECERT || process.env.SECERT;
        
        let authPath = url + 'auth/local/';
        let config = {
            method: 'POST',
            body: JSON.stringify({
                "identifier": `${user}`,
                "password": `${secert}`
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(authPath, config)
        .then(function(res){
            return res.json();
        })
        .then(function(json){
            callback(json.jwt);
        })
    }

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

    searhByAddressInSurveylist(searchAddress, callback) { // TODO: Update with auth
        // let queryAddress = encodeURIComponent(searchAddress);
        this.getAuthToken(function(token){
            let bodyParam = { query: "query { surveylists (where: { fullAddress_contains:\"" + searchAddress + "\"}){fullAddress buildingName registrationNumber buildingType buildingValue buildingNumber status}}" };
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
        this.getAuthToken(function(token){
            let bodyParam = { query: "query { surveylists (where: { fullAddress_contains:\"" + addressQuery + "\",  status_contains:\"exists\"}){fullAddress buildingName registrationNumber buildingType buildingValue buildingNumber status}}" };
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
                // console.log(myJson);
                let expression = jsonata('data.$.surveylists.{"id":_id, "registrationNO":registrationNumber, "type":buildingType, "address":fullAddress, "value":buildingValue,"status":status, "date":updatedAt,"buildingNo":buildingNumber,"buildingName":buildingName}');
                let cmplist = expression.evaluate(myJson);
                callback(cmplist);
            });
        })
    }



    getComplainsSearchResults(Search, callback) {
        fetch(url + 'surveylist?status=exists&' + Search)
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