const localConfig = require('../config/local.json')
const fetch = require("node-fetch");
const jsonata = require("jsonata");
const url = localConfig.CMS_URL || process.env.CMS_URL;
class InternalService {

    getallinternalnews(callback) {

        fetch(url + 'internalnews?_limit=999999')
            .then(async function (response) {
                let cmsResponse = await response.json();
                if (cmsResponse.length <= 100)
                    return cmsResponse;
                else {
                    let morphed = cmsResponse.sort((a, b) => {
                        let dateA = new Date(a.datePublished);
                        let dateB = new Date(b.datePublished);

                        return dateB - dateA;
                    }).slice(0, 101);

                    return morphed;
                }
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"title":ArticleName,"date":createdAt,"label":Type,"DatePublished":datePublished,"newImage1":"' + url.slice(0, -1) + '"& new_image1.url}');
                let newsObject = expression.evaluate(myJson);
                callback(newsObject);
            });
    }


    getlimitednews(limit, callback) {

        fetch(url + 'internalnews?_sort=updatedAt:desc&_limit=' + limit)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"title":ArticleName,"date":createdAt,"label":Type,"DatePublished":datePublished,"newImage1":"' + url.slice(0, -1) + '"& new_image1.url}');
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
                let expression = jsonata('$.{"id":_id,"title":ArticleName,"date":createdAt,"label":Type,"DatePublished":datePublished, "p1":new_paragraph1,  "p2":new_paragraph2,  "p3":new_paragraph3,  "p4":new_paragraph4,  "p5":new_paragraph5,"newImage1":"' + url.slice(0, -1) + '"& new_image1.url, "newImage2":"' + url.slice(0, -1) + '"& new_image2.url,"newImage3":"' + url.slice(0, -1) + '"& new_image3.url,"newImage4":"' + url.slice(0, -1) + '"& new_image4.url,"newImage5":"' + url.slice(0, -1) + '"& new_image5.url}');
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