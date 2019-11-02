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
                let expression = jsonata('$.{"id":_id,"title":ArticleName,"article":Description,"date":createdAt,"author":AuthorName, "fullarticle":FullArticle,"image":"' + url.slice(0, -1) + '"& image.url, "image2":"' + url.slice(0, -1) + '"& image2.url, "label":Type,"DatePublished":datePublished}');
                let newsObject = expression.evaluate(myJson);
                callback(newsObject);
            });
    }


    getlimitednews(limit, callback) {
        //console.log("Get New by limit ..... ");

        fetch(url + 'internalnews?_sort=updatedAt:desc&_limit=' + limit)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"title":ArticleName,"article":Description,"date":createdAt,"author":AuthorName, "fullarticle":FullArticle, "image":"' + url.slice(0, -1) + '"& image.url,"label":Type,"DatePublished":datePublished}');
                let newsObject = expression.evaluate(myJson);
                callback(newsObject);
            });
    }



    getnewsbyID(id, callback) {
        //console.log("Get New by ID ..... ");
        fetch(url + 'internalnews/' + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"title":ArticleName,"article":Description,"date":createdAt,"author":AuthorName, "fullarticle":FullArticle,"image":"' + url.slice(0, -1) + '"& image.url,"image2":"' + url.slice(0, -1) + '"& image2.url,"label":Type,"DatePublished":datePublished, "p1":new_paragraph1,  "p2":new_paragraph2,  "p3":new_paragraph3,  "p4":new_paragraph4,  "p5":new_paragraph5, "newImage1alt":new_image1Alt,   "newImage2alt":new_image2Alt,  "newImage3alt":new_image3Alt,  "newImage4alt":new_image4Alt,  "newImage5alt":new_image5Alt,  "newImage1":"' + url.slice(0, -1) + '"& new_image1.url, "newImage2":"' + url.slice(0, -1) + '"& new_image2.url,"newImage3":"' + url.slice(0, -1) + '"& new_image3.url,"newImage4":"' + url.slice(0, -1) + '"& new_image4.url,"newImage5":"' + url.slice(0, -1) + '"& new_image5.url, "news_id":news_id  }');
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