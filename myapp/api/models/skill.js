'use strict';

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    SkillSchema = new Schema({
        group: {
            type: String
        },
        skills: {
            type: [{
                name:{
                    type: String
                },
                knowledge: {
                    type:Number,
                    default: 0
                }
            }]
        }
    });

mongoose.model('skill',SkillSchema);