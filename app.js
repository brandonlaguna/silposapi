const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
var path = require('path');
//middlewares

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//routes
app.use(require('./src/routes/index'));

app.listen(3000);
console.log('Server on port 3000');
