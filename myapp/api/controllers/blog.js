const mongoose = require('mongoose');


module.exports.getArticles = function(req,res) {
    const article = [
        {
            "title": "test1",
            "date": "2017-09-16",
            "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod."
        },
        {
            "title": "test2",
            "date": "2017-09-16",
            "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod."
        },
        {
            "title": "test3",
            "date": "2017-09-16",
            "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod."
        }
    ];

    const blog = mongoose.model('blog');

    blog.find().then( items =>{
        if (!items.length) {
            res.status(200).json({articles: article});
        } else {
            res.status(200).json({articles: items});
        }
    })
}

module.exports.createArticle = function(req,res){
    const Model = mongoose.model('blog');
    console.log(req.body);
    let item = new Model({
        title: req.body.title,
        date: new Date(req.body.date),
        text: req.body.text
    });

    console.log('item',item);

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
    })
}

module.exports.editArticle = function(req,res){
    res.json('PUT');
}

module.exports.deleteArticle = function(req,res){
    res.json('DELETE');
}