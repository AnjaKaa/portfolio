const http = require('request');
const config = require('../config.json');

const apiOptions = {
  server: config.http.server
}

module.exports.getAbout = function(req, res, next) {
  const pathAPI = '/api/skills';
  const requestOptions = {
    url: apiOptions.server + pathAPI,
    method: 'GET'
  };
  const sendObj = { 
    'title': 'Обо мне'
  };

  http(requestOptions, function(error,response,body){
   
    sendObj.skillsList = JSON.parse(body).skillsList;
    console.log(sendObj)
    res.render('pages/about', sendObj);
  });
};
