const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const clientesSchema = new Schema({ // se crea el modelo de la coleccion

	nombre: {
		type: String,
		trim: true // quitar espacios en blanco
	},
	apellido: {
		type: String,
		trim: true // quitar espacios en blanco
	},
	empresa: {
		type: String,
		trim: true // quitar espacios en blanco
	},
	correo: {
		type: String,
		unique: true, // validar que cada correo sea unico
		lowercase: true, // convertir el correo a minuscula
		trim: true
	},
	telefono: {
		type: String,
		trim: true // quitar espacios en blanco
	}
});

//exportar modelo 

module.exports = mongoose.model('Clientes', clientesSchema);
