const localConfig = require('../config/local.json')
const fetch = require("node-fetch");
const jsonata = require("jsonata");
const auth = require('../services/service-manager').get('auth-service');
// const exp = require('./jsonataExpression.json');
// const queryString = require('query-string');
const url = localConfig.CMS_URL || process.env.CMS_URL;
class GlobalSearchService {


    searchAllContents(value, callback) {
        let queryValue = encodeURIComponent(value);

        auth.getAuthToken(function (token) {

            let aurl = url + 'search-all/' + queryValue;

            let options = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            };

            fetch(aurl, options)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    var contentObject = [];
                    var mergedExpression = [];

                    if (Array.isArray(myJson)) {
                        myJson.forEach(element => {
                            let expression = undefined;
                            if (element.contentType == 'projects') {
                                delete element.contentType;
                                expression = jsonata('*.$.{"id":_id,"title":Title,"image":"' + url.slice(0, -1) + '"& ImageUrl,"details":Event, "contentType":"projects"}');
                            } else if (element.contentType == 'news') {
                                delete element.contentType;
                                expression = jsonata('*.$.{"id":_id,"title":ArticleName,"image":ImgURL,"details":Description, "contentType":"news"}');
                            } else if (element.contentType == 'internalnews') {
                                delete element.contentType;
                                expression = jsonata('*.$.{"id":_id,"title":ArticleName,"image":ImgURL,"details":Description, "contentType":"internalnews"}');
                            } else if (element.contentType == 'competitions') {
                                delete element.contentType;
                                expression = jsonata('*.$.{"id":_id,"title":Title,"image": "' + url.slice(0, -1) + '"& photo.url,"details":Description, "contentType":"competitions"}');
                            }
                            console.log(expression)
                            if (expression !== undefined){
                                contentObject = expression.evaluate(element);
                                mergedExpression.push(contentObject);
                            }
                        });
                    }

                    callback(mergedExpression);
                });
        });
    }

}

module.exports = function (app, serviceManager) {
    var globalsearch = new GlobalSearchService();
    serviceManager.set("global-search-services", globalsearch);
};