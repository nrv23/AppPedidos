const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors'); //cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
require('./db/database');

//habilitar bodyParser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//definir los dominios donde voy a van a recibir peticiones el servidor
const listaBlanca = ['http://localhost:3000']; // con este arreglo se puede pasar todas las urls que
// el servidor va aceptar
const corsOptions = {
    origin: (origin, callback) => { // el parametro origin es la ip que trata de hacer 
        //un request al servidor
        console.log(origin)
        const existe = listaBlanca.some(dominio => dominio === origin); // si la ip entrante existe 
        //en la lista blanca, some indica si existe

        if (existe) {
            callback(null, true); // el primer parametro es un error, en este caso es null 
            //porque la ip es permitida, el segundo parametro es si el valor es permitido y 
            //en este caso va el true
        } else { //error generado por cors al no dar acceso a la API
            callback(new Error('No permitido por CORS'));
        }
    }
}

//habilitar cors para dar acceso remoto a clientes que van a consumir la api
//app.use(cors(corsOptions));
//app.use(cors({ origin: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', listaBlanca);
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


const server = http.createServer(app);

app.use('/', routes());

//habilitar carpeta publica para listar las imagenes de los productos

app.use(express.static('uploads')); // al ejecutar esta linea de codigo, el sistema toma esta direccion
// ala carpeta como la base para poder buscar archivos publicos

server.listen(5000, () => {
    console.log("Escuchando en el puerto 5000");
});