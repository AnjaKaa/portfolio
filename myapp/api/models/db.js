const mongoose = require('mongoose');
const config = require('../../config.json');

mongoose.Promise = global.Promise;

let options = {
    user: config.db.user,
    pass: config.db.password,
    useMongoClient: true
};
let host = config.db.host;
let port = config.db.port;
let db = config.db.name;

mongoose.connect(`mongodb://${host}:${port}/${db}`, options)
    .catch(e =>{
        console.error(e);
        throw e;
    });

//обработка подключения
mongoose.connection.on('connected', function() {
    console.log(`Mongoose default connection open mongodb://${host}:${port}/${db}`);
})

//ошибка подключения
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: '+err);
})

//ошибка подключения
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
})

process.on('SIGNT', function () {
    mongoose.connection.close( function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

require('./blog');
require('./works');

require('./skill');