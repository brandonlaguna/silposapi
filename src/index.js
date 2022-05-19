const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var path = require('path');
const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

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
