const localConfig = require('../config/local.json')
const fetch = require("node-fetch");
const jsonata = require("jsonata");
// const exp = require('./jsonataExpression.json');
// const queryString = require('query-string');
const url = localConfig.CMS_URL || process.env.CMS_URL;
class GlobalSearchService {


    searchAllContents(value, callback) {
        let queryValue = encodeURIComponent(value);
        fetch(url + 'search-all/' + queryValue)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var mergedExpression = [];
                myJson.forEach(element => {
                    if (element.contentType == 'projects') {
                        delete element.contentType;
                        var expression = jsonata('*.$.{"id":_id,"title":Title,"image":ImageUrl,"details":Event, "contentType":"projects"}');
                    }

                    else if (element.contentType == 'news') {
                        delete element.contentType;
                        var expression = jsonata('*.$.{"id":_id,"title":ArticleName,"image":ImgURL,"details":Description, "contentType":"news"}');
                    }

                    else if (element.contentType == 'internalnews') {
                        delete element.contentType;
                        var expression = jsonata('*.$.{"id":_id,"title":ArticleName,"image":ImgURL,"details":Description, "contentType":"internalnews"}');
                    }

                    else if (element.contentType == 'competitions') {
                        delete element.contentType;
                        var expression = jsonata('*.$.{"id":_id,"title":Title,"image": "' + url.slice(0, -1) + '"& photo.url,"details":Description, "contentType":"competitions"}');
                    }



                    let contentObject = expression.evaluate(element);
                    mergedExpression = [...mergedExpression, ...contentObject];
                });

                callback(mergedExpression);
            });
    }

}

module.exports = function (app, serviceManager) {
    var globalsearch = new GlobalSearchService();
    serviceManager.set("global-search-services", globalsearch);
};