const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
var path = require('path');
//middlewares

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//routes
app.use(require('./src/routes/index'));

app.listen(3001);
console.log('Server on port 3001');
