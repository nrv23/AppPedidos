const clienteController = require('../controllers/clienteController');
const express = require('express');
const router = express.Router();

module.exports = () => {


	//agrega nuevos clientes via POST

	router.post('/clientes',clienteController.nuevoCliente);	
	router.get('/clientes', clienteController.mostrarClientes);
	router.get('/clientes/:id', clienteController.obtenerCliente);
	router.put('/clientes/:id', clienteController.actualizarCliente);
	router.delete('/clientes/:id', clienteController.eliminarCliente);
	return router;
}