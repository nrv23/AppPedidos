import React from 'react';


const Cliente = ({cliente}) => { // hace destructuring directamente al props en los argumentos
	// de la funcion



	return (

		<li className="cliente">
	        <div className="info-cliente">
	            <p className="nombre">{cliente.nombre} {cliente.apellido}</p>
	            <p className="empresa">{cliente.empresa}</p>
	            <p>{cliente.correo}</p>
	            <p>Tel: {cliente.telefono}</p>
	        </div>
	        <div className="acciones">
	            <a href="#" className="btn btn-azul">
	                <i className="fas fa-pen-alt"></i>
	                Editar Cliente
	            </a>
	            <button type="button" className="btn btn-rojo btn-eliminar">
	                <i className="fas fa-times"></i>
	                Eliminar Cliente
	            </button>
	        </div>
	    </li>
	);
}


export default Cliente;