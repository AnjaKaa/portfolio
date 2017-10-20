'use strict';

const mongoose = require('mongoose'),
    BlogSchema = mongoose.Schema({
        title : {
            type: String,
            require: [true,'Укажите заголовок статьи']
        },
        text: {
            type: String,
            require: [true,'Укажите содержимое статьи']
        },
        date: {
            type: String,
            require: [true,'Укажите дату публикации']
        }
    });

    
mongoose.model('blog',BlogSchema);