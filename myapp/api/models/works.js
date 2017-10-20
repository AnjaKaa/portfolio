'use strict';

let mongoose = require('mongoose'),
    WorkSchema = mongoose.Schema({
        title : {
            type: String,
            require: [true,'Укажите имя проекта']
        },
        skills: {
            type: String,
            require: [true,'Укажите используемые технологии']
        },
        link: {
            type: String,
            require: [true,'Укажите ссылку на проект']
        },
        img: {
            type: [String]
        }
    });

    
mongoose.model('work',WorkSchema);