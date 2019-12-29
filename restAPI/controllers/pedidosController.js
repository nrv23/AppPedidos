const Pedidos = require('../models/Pedidos');

exports.nuevoPedido= async (req, res, next) => {
	try {
		const pedido = new Pedidos(req.body);
		await pedido.save();
		res.json({mensaje:'Nuevo pedido agregado'})
	} catch(e) {
		// statements
		console.log(e);
		next();
	}
}

exports.mostrarPedidos = async (req,res, next) => {

	try {
		const pedidos = await Pedidos.find({}).populate('cliente').populate({
			path: 'pedido.producto', // donde va buscar la informacion
			model: 'Productos' //asignar el modelo para cargar la informacion
		});

		res.json({pedidos})

	} catch(e) {
		// statements
		console.log(e);
		next();
	}
}


exports.mostrarPedido = async (req,res,next) => {

	const {id}= req.params;

	try {

		const pedido = await Pedidos.findById(id).populate('cliente').populate({
			path: 'pedido.producto', // donde va buscar la informacion
			model: 'Productos' //asignar el modelo para cargar la informacion
		});

		if(!pedido){
			return res.json({mensaje: 'No enbcontrado'})
		}

		res.json({pedido})

	} catch(e) {
		// statements
		console.log(e);
		next();
	}
}

exports.actualizarPedido = async (req,res, next) => {

	const {id}= req.params;

	try {
		
		const pedido = await Pedidos.findOneAndUpdate({_id:id},req.body,{
			new: true
		}).populate('cliente').populate({ // esta linea trae la informacion de cada producto y cliente
			path: 'pedido.producto', // donde va buscar la informacion
			model: 'Productos' //asignar el modelo para cargar la informacion
		});

		res.json({pedido});

	} catch(e) {
		// statements
		console.log(e);
		next();
	}
}


exports.eliminarPedido = async (req,res,next) => {
	const {id}= req.params;

	try {

		await Pedidos.findByIdAndDelete(id);
		res.json({ mensaje: 'Pedido eliminado'});
	} catch(e) {

		console.log(e);
		next();
	}
}