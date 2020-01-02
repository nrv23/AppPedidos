const Usuario = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async(req, res) => {

    const usuario = new Usuario(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);

    try {

        await usuario.save();
        res.json({ mensaje: 'Usuario  registrado' });

    } catch (e) {

        console.log(e);
        res.json({ mensaje: 'Hubo un error' });
    }

}

exports.autenticarUsuario = async(req, res, next) => {

    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            await res.status(401).json({ mensaje: 'Usuario no existe' });
            next(); // ir al siguiente middleware y asi el api no se va quedar ejecutando el endpoint
        } else {
            if (!bcrypt.compareSync(password, usuario.password)) {
                await res.status(401).json({ mensaje: 'Contraseña incorrecta' });
                next();
            } else {
                //si el password es correcto firmar el token
                const token = jwt.sign({ // lo que esta dentro de la funcion sign es el 
                    //paylod del token, el cuerpo, lo que contiene la informacion enviada por ese token
                    email: usuario.email,
                    nombre: usuario.nombre,
                    id: usuario._id
                }, 'LLAVESECRETA', { //luego se le pasa una llave secreta que va firmar el token,
                    //la palabra secreta se usa tambien para verificar que cuando se hace una peticion 
                    //al servidor, el token sea valido

                    //luego se le indica el tiempo de validez del token

                    expiresIn: '1h' //vencimiento en una hora
                });

                res.json({ token });

            }

        }

    } catch (err) {

        console.log(err);
        res.json({ mensaje: 'Hubo un error' });
    }
}