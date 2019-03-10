const localConfig = require('../config/local.json')
const fetch = require("node-fetch");
const jsonata = require("jsonata");
const url = localConfig.CMS_URL || process.env.CMS_URL;

class OfficesService {

    getAllOffices(callback) {
        fetch(url + 'consultingOffice')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"officeName":officeName,"details":specialities,"owner":owner,"address":address,"speciality":speciality,"postalCode":postalCode,"number":phoneNumbers,"email":email,"Fax":Fax}');
                let officesObject = expression.evaluate(myJson);
                callback(officesObject);
            });
    }

    getOfficeByID(id, callback) {
        fetch(url + 'consultingOffice/' + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"officeName":officeName,"details":specialities,"owner":owner,"address":address,"speciality":speciality,"postalCode":postalCode,"number":phoneNumbers,"email":email,"Fax":Fax}');
                let officesObject = expression.evaluate(myJson);
                callback(officesObject);
            });
    }
}

module.exports = function (app, serviceManager) {
    var officeservice = new OfficesService();
    serviceManager.set("offices-services", officeservice);
};