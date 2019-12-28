const express= require('express');
const app = express();
const http = require('http');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//conectar con mongodb
mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost/restapi',{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
mongoose.set('useCreateIndex', true);

//habilitar bodyParser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

const server = http.createServer(app);


app.use('/',routes());

server.listen(5000);
