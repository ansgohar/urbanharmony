const localConfig = require('../config/local.json')
const fetch = require("node-fetch");
const jsonata = require("jsonata");
const url = localConfig.CMS_URL || process.env.CMS_URL;
class BooksService {


    getAllBooks(callback) {
        fetch(url + 'library')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"title":title,"ISBN":ISBN,"author":author,"classNO":classNo,"location":location,"NumCopies":numberOfCopies,"printingNO":printingNo,"publisher":publisher,"publishYear":yearOfPublish,"image" :  "' +url.slice(0, -1) +'"& image.url, "bookCategory":bookcategory}');
                let booksObject = expression.evaluate(myJson);
                callback(booksObject);
            });
    }
}

module.exports = function (app, serviceManager) {
    var bookservice = new BooksService();
    serviceManager.set("books-services", bookservice);
};