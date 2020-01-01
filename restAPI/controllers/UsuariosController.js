const Usuario = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.registrarUsuario = async (req, res) => {

	const usuario = new Usuario(req.body);
	usuario.password = await bcrypt.hash(req.body.password,12);

	try {
			
		await usuario.save();
		res.json({mensaje: 'Usuario  registrado'});

	} catch(e) {

		console.log(e);
		res.json({mensaje : 'Hubo un error'});
	}

}


exports.autenticarUsuario = async (req,res, next) => {


}