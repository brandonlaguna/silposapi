const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var path = require('path');
const cors = require('cors');
app.use(cors({
    origin: '*',
    credentials: false,
    optionSuccessStatus: 200
}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', false);
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
//middlewares

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes/index'));

app.listen(3001);
console.log('Server on port 3001');
