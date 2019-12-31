const express= require('express');
const app = express();
const http = require('http');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

//cors permite que un cliente se conecte a otro servidor para el intercambio de recursos

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

//habilitar cors para dar acceso remoto a clientes que van a consumir la api

app.use(cors());

const server = http.createServer(app);


app.use('/',routes());

//habilitar carpeta publica para listar las imagenes de los productos

app.use(express.static('uploads')); // al ejecutar esta linea de codigo, el sistema toma esta direccion
// ala carpeta como la base para poder buscar archivos publicos

server.listen(5000, () => {
	console.log("Escuchando en el puerto 5000");
});
