const localConfig = require('../config/local.json')
const fetch = require("node-fetch");
const jsonata = require("jsonata");
const url = localConfig.CMS_URL || process.env.CMS_URL;
class InternalService {

    getallinternalnews(callback) {

        fetch(url + 'internalnews')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"title":ArticleName,"article":Description,"date":createdAt,"author":AuthorName, "fullarticle":FullArticle,"image":ImgURL, "label":Type,"DatePublished":datePublished}');
                let newsObject = expression.evaluate(myJson);
                callback(newsObject);
            });
    }


    getlimitednews(limit, callback) {
        console.log("Get New by limit ..... ");

        fetch(url + 'internalnews?_sort=updatedAt:desc&_limit=' + limit)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"title":ArticleName,"article":Description,"date":createdAt,"author":AuthorName, "fullarticle":FullArticle, "image":ImgURL,"label":Type,"DatePublished":datePublished}');
                let newsObject = expression.evaluate(myJson);
                callback(newsObject);
            });
    }



    getnewsbyID(id, callback) {
        console.log("Get New by ID ..... ");
        fetch(url + 'internalnews/' + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"title":ArticleName,"article":Description,"date":createdAt,"author":AuthorName, "fullarticle":FullArticle,"image":ImgURL,"label":Type,"DatePublished":datePublished}');
                let newsObject = expression.evaluate(myJson);
                console.log(newsObject);
                callback(newsObject);
            });
    }

}

module.exports = function (app, serviceManager) {
    var internal = new InternalService();
    serviceManager.set("internal-services", internal);
};