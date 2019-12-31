const Clientes = require('../models/Clientes');


exports.nuevoCliente = async (req, res, next) => {

	const cliente = new Clientes(req.body);

	try {
		
		await cliente.save();
		res.status(200).json({
			mensaje: 'Cliente insertado'
		})
	} catch(e) {
		// statements
		res.send(e);
		next();
	}
}


exports.mostrarClientes = async (req, res, next) => {

	try {
		
		const clientes = await Clientes.find({});
		res.status(200).send(clientes);

	} catch(e) {
		// statements
		res.send(e);
		next();
	}
}

exports.obtenerCliente = async (req, res, next) => {

	const {id} = req.params;

	try {
		
		const cliente = await Clientes.findById(id);

		if(!cliente){
			res.json({
				mensaje: 'No encontrado'
			})
		}

		res.status(200).send(cliente);

	} catch(e) {
		// statements
		res.send(e);
		next();
	}
}

exports.actualizarCliente = async (req, res, next) => {
	const {id} = req.params;
	
	try {
		
		const cliente = await Clientes.findOneAndUpdate({_id: id},req.body,{
			new: true // devolver el registro con la ultima actualizacion
		})

		res.json(cliente);

	} catch(e) {
		// statements
		res.send(e);
		next()
	}
}

exports.eliminarCliente = async (req, res,next) =>{
	
	const {id} = req.params;

	try {
		
		await Clientes.findOneAndDelete({_id: id});

		res.json({
			mensaje: 'Cliente eliminado'
		});

	} catch(e) {
		// statements
		res.send(e);
		next();
	}
}