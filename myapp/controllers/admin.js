const formidable = require('formidable');
const http = require('request');
const mongoose = require('mongoose');

const config = require('../config.json');

const apiOptions = {
    server: config.http.server
}
const fs =require('fs');
const path = require('path');

module.exports.getAdmin = function(req, res) {
    const pathAPI = '/api/skills';
    const requestOptions = {
        url: apiOptions.server + pathAPI,
        method: 'GET'
      };
      const sendObj = { 
        'title': 'Панель администрирования',
        'msgblog': req.query.msgblog,
        'msgworks': req.query.msgworks,
        'msgskill': req.query.msgskill
      };

      http(requestOptions, function(error,response,body){
        
         sendObj.skillsList = JSON.parse(body).skillsList;
         res.render('pages/admin', sendObj);
       });

  };

module.exports.updateSkills = function(req, res) {
  console.log(req.body);
   let skills =[];
   let models =[];
   Object.keys(req.body).map(name =>{
      skills.push(name.split('/'));
   });
   skills.forEach(skill =>{
    let isAdd=false;
    models.forEach(item =>{
     
      
      if (item['group']==skill[0]) {
        item['skills'].push({
          'name': skill[1],
          'knowledge':req.body[skill[0]+'/'+skill[1]]
        });
        isAdd=true;
      }
      
    });
    if(!isAdd){
      models.push({
        'group':skill[0],
        'skills':[{
          'name': skill[1],
          'knowledge':req.body[skill[0]+'/'+skill[1]]
        }]
      });
    }
     
  });


  const pathApi = '/api/skills';
  const requestOptions = {
    url: apiOptions.server + pathApi,
    method: 'POST',
    json: models
  };
  http(requestOptions, function(error,respoce,body) {
     
    //res.redirect('/admin?msgskill=' + body.ststus);
    res.json({message: 'Сохранено!'})
  })
};



module.exports.addArticle = function(req, res) {
    const pathApi = '/api/blog';
    const requestOptions = {
      url: apiOptions.server + pathApi,
      method: 'POST',
      json: {
        title: req.body.title,
        date: new Date(req.body.date),
        text: req.body.text
      }
    };

    http(requestOptions, function(error,respoce,body) {
      //res.redirect('/admin?msgblog=' + body.ststus);
      res.json({message: 'Запись в блог добавлена!'})
    })
  };

module.exports.addWork = function(req, res) {
        console.log(req.body);

        const pathApi = '/api/work';
        const requestOptions = {
          url: apiOptions.server + pathApi,
          method: 'POST',
          json: {
            title: req.body.title,
            skills: req.body.skills,
            link: req.body.link,
            file: req.body.file
          }
        };
        
    
        http(requestOptions, function(error,respoce,body) {
          if (error) {
            return  res.json({'message': 'Картинка не сохранилась в БД'});
          }
         // res.redirect('/admin?msgworks=' + body.ststus);
         res.json({message: 'Запись добавлена в список работ!'})
        })
      
  };