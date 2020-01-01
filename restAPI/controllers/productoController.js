const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'/../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

const upload = multer(configuracionMulter).single('imagen');

exports.subirArchivo = (req, res, next) => {
	upload(req, res, function(err){
		if(err){
			res.json({err})		
		}	
		return next();
	})
}

exports.nuevoProducto = async (req, res, next) => {
	const producto = new Productos(req.body);

	try {
		if(req.file.filename){ // si se ha subido una imagen, asignarla al producto
			producto.imagen = req.file.filename;
		}
		await producto.save();
		res.status(200).json({
			mensaje: 'Producto insertado'
		})
	} catch(e) {
		// statements
		console.log(e);
		next();
	}
}


exports.mostrarProductos = async (req, res) =>{
	try{
		
		const productos = await Productos.find({});
		res.json({productos});
	}catch(err){
		console.log(err);
		next();
	}
}

exports.mostrarProducto= async (req, res, next)=>{

	const {id} = req.params;

	try {
		const producto = await Productos.findById(id);

		if(!producto){
			return res.json({mensaje: 'No encontrado'})
		}

		res.json({producto});

	} catch(e) {
		// statements
		console.log(e);
		next();
	}
}


exports.actualizarProducto = async (req, res , next) =>{
	try {

			let nuevoProducto = req.body;

			//si subió una imagen
			if(req.file){
				nuevoProducto.imagen = req.file.filename;
			}else{
				let buscarProducto = await Productos.findById(req.params.id);
				nuevoProducto.imagen = buscarProducto.imagen
			}

			const productoActualizado = await Productos.findOneAndUpdate({_id: req.params.id},
				nuevoProducto,{
				new: true
			})

			res.json({productoActualizado});

	} catch(e) {
		// statements
		console.log(e);
		next();
	}
}

exports.eliminarProducto = async (req, res, next) => {
	const {id} = req.params;

	try {
		await Productos.findByIdAndDelete({_id: id});
		res.json({mensaje: 'producto eliminado'})
	} catch(e) {
		// statements
		console.log(e);
		next();
	}
} 


exports.buscarProducto = async (req, res, next) => {

	try {

		const {query} = req.params;

		const producto = await Productos.find({
			nombre: new RegExp(query,'i') // el primer parametro va ser la palabra clave para 
			//coincidencias en la busqueda, el segundo parametro que sea case insensitive,
			//es decir buscar por NODE, node o Node y que filtre las busquedas
		});
		
		if(producto.length == 0){

			return res.json({mensaje: 'No hay resultados'});
		}

		res.json(producto);

	} catch(e) {
		console.log(e);
		next();
	}

}