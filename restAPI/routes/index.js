const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidosController = require('../controllers/pedidosController');
const express = require('express');
const router = express.Router();

module.exports = () => {

	//Cliente
	router.post('/clientes',clienteController.nuevoCliente);	
	router.get('/clientes', clienteController.mostrarClientes);
	router.get('/clientes/:id', clienteController.obtenerCliente);
	router.put('/clientes/:id', clienteController.actualizarCliente);
	router.delete('/clientes/:id', clienteController.eliminarCliente);

	//Productos
	router.post('/productos', productoController.subirArchivo,productoController.nuevoProducto);
	router.get('/productos',productoController.mostrarProductos);
	router.get('/productos/:id',productoController.mostrarProducto);
	router.put('/productos/:id', productoController.subirArchivo, productoController.actualizarProducto);
	router.delete('/productos/:id', productoController.eliminarProducto);	

	//Pedidos
	router.post('/pedidos', pedidosController.nuevoPedido);
	router.get('/pedidos', pedidosController.mostrarPedidos);
	router.get('/pedidos/:id', pedidosController.mostrarPedido);
	router.put('/pedidos/:id', pedidosController.actualizarPedido);
	router.delete('/pedidos/:id',pedidosController.eliminarPedido);

	
	return router;
}