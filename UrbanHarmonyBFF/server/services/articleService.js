const localConfig = require('../config/local.json')

const fetch = require("node-fetch");
const jsonata = require("jsonata");
const url = localConfig.CMS_URL || process.env.CMS_URL;
class ArticleService {

    getallnews(callback) {

        fetch(url + 'Journal?_sort=updatedAt:desc&_limit=999999')
            .then(async function (response) {
                let cmsResponse = await response.json();
                if (cmsResponse.length <= 100)
                    return cmsResponse;
                else {
                    let morphed = cmsResponse.sort((a, b) => {
                        let dateA = new Date(a.DatePublished);
                        let dateB = new Date(b.DatePublished);

                        return dateB - dateA;
                    }).slice(0, 101);

                    return morphed;
                }
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"title":ArticleName,"article":Description,"date":createdAt,"image":ImgURL, "linkURL":URL, "author":AuthorName, "DatePublished":DatePublished}');
                let articleObject = expression.evaluate(myJson);
                callback(articleObject);
            });
    }

    getlimited(limit,callback) {

        fetch(url + 'Journal?_sort=updatedAt:desc&_limit=' + limit)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"title":ArticleName,"article":Description,"date":createdAt,"image":ImgURL, "linkURL":URL, "author":AuthorName,"DatePublished":DatePublished}');
                let articleObject = expression.evaluate(myJson);
                callback(articleObject);
            });
    }


    getarticlebyid(id, callback) {
        //console.log(id);
        fetch(url + 'news/' + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {

                let expression = jsonata('{"id":_id,"title":ArticleName,"article":Description,"date":createdAt,"image":ImgURL,"linkURL":URL, "author":AuthorName,"DatePublished":DatePublished}');
                let articleObject = expression.evaluate(myJson);
                callback(articleObject);
            });
    }
}

module.exports = function (app, serviceManager) {
    var articleService = new ArticleService();
    serviceManager.set("article-services", articleService);
};