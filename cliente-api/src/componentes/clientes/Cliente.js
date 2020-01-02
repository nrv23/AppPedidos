import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {CRMContext} from '../../context/CRMContext';

const Cliente = (props) => { // hace destructuring directamente al props en los argumentos
	// de la funcion

	const [auth] = useContext(CRMContext);
	const {cliente,history} = props;
	const eliminarCliente = (id) => {

		if(auth.token !== ''){
			Swal.fire({
				title: 'Está seguro?',
				text: 'El registro del cliente no se podrá recuperar',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Borrar',
				cancelButtonText: 'Cancelar'
			  }).then((result) => {
				if (result.value) {
				  
				 try {
					const url=`/clientes/${cliente._id}`;
					clienteAxios.delete(url,{
						headers: {
							Authorization: 'Bearer '+auth.token
						}
					})
					.then(respuesta => {	
		
						 Swal.fire( 
						  'Deleted!',
						  respuesta.data.mensaje,
						  'success'
						)
					})
				 } catch (error) {
					if(error.response.status === 500){ // si viene un token pero no valido o vencido,
						//redirecciona a iniciar sesion
						props.history.push('/iniciar-sesion')
					}  
				 }
				}
			  })
		}else{
			history.push('/iniciar-sesion')
		}
	}

	return (

		<li className="cliente">
	        <div className="info-cliente">
	            <p className="nombre">{cliente.nombre} {cliente.apellido}</p>
	            <p className="empresa">{cliente.empresa}</p>
	            <p>{cliente.correo}</p>
	            <p>Tel: {cliente.telefono}</p>
	        </div>
	        <div className="acciones">
	            <Link to={'/clientes/editar/'+cliente._id} className="btn btn-azul">
	                <i className="fas fa-pen-alt"></i>
	                Editar Cliente
	            </Link >
	            <Link to={'/pedidos/nuevo/'+cliente._id} className="btn btn-amarillo">
	                <i className="fas fa-plus"></i>
	                Nuevo Pedido
	            </Link >
	            <button type="button" className="btn btn-rojo btn-eliminar"
	            	onClick={() => eliminarCliente(cliente._id)}

	            >
	             {/*Al pasar una funcion de flecha dentro de un evento lo que es esperar
					hasta que se ejecute el evento para ejecutar la funcion
	            */}
	                <i className="fas fa-times"></i>
	                Eliminar Cliente
	            </button>
	        </div>
	    </li>
	);
}


export default withRouter(Cliente);