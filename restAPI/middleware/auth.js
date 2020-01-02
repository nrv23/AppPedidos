const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //autorizacion por medio del Header
    const authHeader = req.get('Authorization');
    console.log("auth ", authHeader);
    if (!authHeader) { // sino se envia el token
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];
    let verificarToken;

    try {
        verificarToken = jwt.verify(token, 'LLAVESECRETA')
    } catch (error) { // cae en el catch si el token no es valido
        error.statusCode = 500;
        throw error;
    }

    if (!verificarToken) { // si el token es valido pero tiene algun error
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    // si el token pasa toda la verificacion entonces pasa al siguiente middleware

    next();

}