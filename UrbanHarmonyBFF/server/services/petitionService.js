const localConfig = require('../config/local.json')
const fetch = require("node-fetch");
const jsonata = require("jsonata");
const url = localConfig.CMS_URL || process.env.CMS_URL;
class PetitionService {


    getAllPetitions(callback) {
        fetch(url + 'petition')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                // let expression = jsonata('$.{"id":_id,"title":title,"ISBN":ISBN,"author":author,"classNO":classNo,"location":location,"NumCopies":numberOfCopies,"printingNO":printingNo,"publisher":publisher,"publishYear":yearOfPublish,"image" :  "' +url.slice(0, -1) +'"& image.url, "bookCategory":bookcategory, "series":seriesName}');
                // let booksObject = expression.evaluate(myJson);
                callback(myJson);
            });
    }
}

module.exports = function (app, serviceManager) {
    var petitionservice = new PetitionService();
    serviceManager.set("petition-services", petitionservice);
};