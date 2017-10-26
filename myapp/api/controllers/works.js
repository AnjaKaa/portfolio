const mongoose = require('mongoose');
const multer = require('multer');


module.exports.getWorks = function(req,res) {
    const listSlides = [
                     {
                         title:'Геоотзыв',
                         skills:'HTML , CSS, JAVASCRIPT',
                         link: 'https://vlasovaanna.github.io/GeoOpinion/',
                         img: './assets/images/work-5.png'
                     },
                     {
                         title:'Библиотека js для вложенных окон',
                         skills:'JAVASCRIPT, HTML , CSS',
                         link: 'https://vlasovaanna.github.io/SubWindow/',
                         img: './assets/images/work-3.png'
                     },
                     {
                         title:'Видео фон и Swipe-меню',
                         skills:'HTML , CSS, jQuery',
                         link: 'https://vlasovaanna.github.io/Video-Swipe/',
                         img: './assets/images/work-4.png'
                     },
                     {
                         title:'Самая первая учебная вёрстка',
                         skills:'HTML , CSS, JAVASCRIPT',
                         link: 'https://vlasovaanna.github.io/252723-gllacy/',
                         img: './assets/images/work-1.png'
                     },
                     {
                         title:'Учебная вёрстка 2',
                         skills:'HTML , CSS',
                         link: 'https://vlasovaanna.github.io/252723-device/',
                         img: './assets/images/work-2.png'
                     }
                 ];

    const works = mongoose.model('work');

    works.find().then( items =>{
        if (!items.length) {
            res.status(200).json({listSlides: listSlides});
        } else {
            res.status(200).json({listSlides: items});
        }
    })
}

module.exports.createWork = function(req,res){
    const Model = mongoose.model('work');
    
    let item = new Model({
        title: req.body.title,
        skills: req.body.skills,
        link: req.body.link,
        img: req.body.file
    });

    item.save()
        .then(item =>{
            return res.status(201).json({status: 'Запись добавлена'});
        }, err =>{
            const error = Object.keys(err.errors)
                                .map( key => err.errors[key].message)
                                .join(', ');
            res.status(404).json({
                stauts: 'при добавлении записи произошла ошибка' + error
            })
        });
};

module.exports.editWork = function(req,res){
    res.json('PUT');
}

module.exports.deleteWork = function(req,res){
    res.json('DELETE');
}