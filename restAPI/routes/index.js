const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidosController = require('../controllers/pedidosController');
const usuarioController = require('../controllers/UsuariosController');
const autorizacion = require('../middleware/auth');
const express = require('express');
const router = express.Router();

module.exports = () => {

    //Cliente
    router.post('/clientes', autorizacion, clienteController.nuevoCliente);
    router.get('/clientes', autorizacion, clienteController.mostrarClientes);
    router.get('/clientes/:id', autorizacion, clienteController.obtenerCliente);
    router.put('/clientes/:id', autorizacion, clienteController.actualizarCliente);
    router.delete('/clientes/:id', autorizacion, clienteController.eliminarCliente);

    //Productos
    router.post('/productos', autorizacion, productoController.subirArchivo, productoController.nuevoProducto);
    router.get('/productos', autorizacion, productoController.mostrarProductos);
    router.get('/productos/:id', autorizacion, productoController.mostrarProducto);
    router.put('/productos/:id', autorizacion, productoController.subirArchivo, productoController.actualizarProducto);
    router.delete('/productos/:id', autorizacion, productoController.eliminarProducto);
    router.post('/productos/busqueda/:query', autorizacion, productoController.buscarProducto);

    //Pedidos
    router.post('/pedidos', autorizacion, pedidosController.nuevoPedido);
    router.get('/pedidos', autorizacion, pedidosController.mostrarPedidos);
    router.get('/pedidos/:id', autorizacion, pedidosController.mostrarPedido);
    router.put('/pedidos/:id', autorizacion, pedidosController.actualizarPedido);
    router.delete('/pedidos/:id', autorizacion, pedidosController.eliminarPedido);

    //Usuarios
    router.post('/crear-cuenta', autorizacion, usuarioController.registrarUsuario); // solo el 
    // de la aplicacion cliente puede crear cuentas
    router.post('/iniciar-sesion', usuarioController.autenticarUsuario);

    return router;
}