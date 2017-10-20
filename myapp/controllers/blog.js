const http = require('request');
const config = require('../config.json');

const apiOptions = {
  server: config.http.server
}

module.exports.getBlog = function(req, res, next) {
    const pathAPI = '/api/blog';
    const requestOptions = {
      url: apiOptions.server + pathAPI,
      method: 'GET'
    };
    const sendObj = { 
      'title': 'Блог'
    };

    http(requestOptions, function(error,response,body){
     
      sendObj.articles = JSON.parse(body).articles;
      console.log(sendObj)
      res.render('pages/blog', sendObj);
    })

  
  };