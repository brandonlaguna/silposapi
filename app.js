const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
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
